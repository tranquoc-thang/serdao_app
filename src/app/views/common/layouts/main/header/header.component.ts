import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '@views/base.component';
import { Title } from '@angular/platform-browser';
import { StringUtil } from '@utilities/string.util';

import { GlobalProvider } from '@providers/global.provider';
import { UserAdminDto } from '@interfaces/dtos/user.dto';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { CommonService } from '@app/services/common/common.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { AdminAuthenticationService } from '@app/services/authentication/admin-authentication.service';
import { DialogService } from 'primeng/dynamicdialog';
import { forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Locale } from '@app/constants';
import { InitiateService } from '@app/services/common/initiate.service';
import { StorageUtil } from '@app/utilities/storage.util';
@Component({
	selector: 'app-main-header-layout',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class MainHeaderLayoutComponent extends BaseComponent implements OnInit {
	public adminInfo!: UserAdminDto;

	public breadcrumbs: any = {};
	public items!: MenuItem[];
	//Initialize Page
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
		private adminAuthenticationService: AdminAuthenticationService,
		private initiateService: InitiateService
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
		this.breadcrumbs = this._router.getCurrentNavigation()?.extras.state;
	}

	ngOnInit(): void {
		this.initializeHeader();
		console.log(this.breadcrumbs);
	}

	public initializeHeader(): void {
		if (!this.breadcrumbs) {
			this._activatedRoute.data.subscribe((a) => (this.breadcrumbs = a));
		}

		this.items = [
			{
				items: [
					{
						label: this._translateService.instant(
							'common.header.labels.sign-out'
						),
						icon: 'pi pi-sign-out',
						command: () => this.doLogout(),
					},
				],
			},
			// {
			// 	label: this._translateService.instant(
			// 		'common.header.labels.language'
			// 	),
			// 	items: [
			// 		{
			// 			label: this._translateService.instant(
			// 				'common.header.labels.japan'
			// 			),
			// 			command: () => {
			// 				this.initializeApp(Locale.japanse);
			// 				this.doChangeLanguage(Locale.japanse);
			// 			},
			// 		},
			// 		{
			// 			label: this._translateService.instant(
			// 				'common.header.labels.english'
			// 			),
			// 			command: () => {
			// 				this.initializeApp(Locale.english);
			// 				this.doChangeLanguage(Locale.english);
			// 			},
			// 		},
			// 	],
			// },
		];
	}

	doLogout(): void {
		this.adminAuthenticationService.doLogout();
	}

	public doChangeLanguage(lang: string): void {
		this._common.attachSpinner();
		forkJoin({
			spinner: of(true).pipe(delay(500)),
			lang: this._translateService.use(lang),
		}).subscribe((result) => {
			if (result.spinner) {
				this._common.detachSpinner();
				this._router.navigate(['/onboarding']);
			}
		});
	}

	private async initializeApp(lang: Locale) {
		await this.initiateService.getInitiateSystem(lang)?.subscribe(
			(result) => {
				if (result.responseStatus === 200) {
					// StorageUtil.clearStorage();
					StorageUtil.storeValue(
						'provincesList',
						result.content.datas.provincesList
					);
					StorageUtil.storeValue(
						'citiesList',
						result.content.datas.citiesList
					);
					StorageUtil.storeValue(
						'careersList',
						result.content.datas.careersList
					);
					StorageUtil.storeValue(
						'typeOfBunsinessList',
						result.content.datas.typeOfBunsinessList
					);
					StorageUtil.storeValue(
						'areasList',
						result.content.datas.areasList
					);
					StorageUtil.storeValue(
						'majorsList',
						result.content.datas.majorsList
					);
				} else {
					console.log(result);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}

}
