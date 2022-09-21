//Import System Library
import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseComponent } from '@views/base.component';

import { StringUtil } from '@utilities/string.util';

import { GlobalProvider } from '@app/providers/global.provider';
import { UserAdminDto } from '@app/interfaces/dtos/user.dto';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { AdminAuthenticationService } from '@app/services/authentication/admin-authentication.service';
import { CommonService } from '@app/services/common/common.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
@Component({
	selector: 'app-onboarding-page',
	templateUrl: './onboarding.page.html',
	styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage extends BaseComponent {
	adminInfo!: UserAdminDto;

	constructor(
		_activatedRoute: ActivatedRoute,
		_confirmationService: ConfirmationService,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		_validate: ValidationUtil,
		_toast: ToastrService,
		_translateService: TranslateService,
		_dialog: DialogService,
		private adminAuthenticationService: AdminAuthenticationService
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

		this.adminInfo = GlobalProvider.adminInfo;
		this._pageTitle.setTitle('Trang chủ');
		// this.initializePage();
	}

	// private async initializePage() {
	// 	console.log(this.adminInfo);
	// }
}
