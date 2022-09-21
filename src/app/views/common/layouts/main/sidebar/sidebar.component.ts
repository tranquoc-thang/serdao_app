import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { StringUtil } from '@app/utilities/string.util';
import { BaseComponent } from '@app/views/base.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '@app/services/common/common.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ValidationUtil } from '@app/utilities/validation.util';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
@Component({
	selector: 'app-main-sidebar-layout',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class MainSideBarLayoutComponent extends BaseComponent {
	currentRoute!: string;

	//Initialize Page
	constructor(
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		protected stringUtil: StringUtil,
		_validate: ValidationUtil,
		_toast: ToastrService,
		_translateService: TranslateService,
		_dialog: DialogService
	) {
		super(
			_activatedRoute,
			_pageTitle,
			_router,
			_materialDialog,
			_common,
			_validate,
			_toast,
			_translateService,
			_dialog
		);
		this.getCurrentRoute();
	}

	ngOnDestroy(): void {
		this.getCurrentRoute().unsubscribe();
	}

	getCurrentRoute(): Subscription {
		return this._router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((event) => {
				if (event instanceof NavigationEnd) {
					
					this.currentRoute = event.url;
					console.log(this.currentRoute);
				}
			});
	}
}
