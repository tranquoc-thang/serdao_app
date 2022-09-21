import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';

import { StringUtil } from '@app/utilities/string.util';
import { ValidationUtil } from '@app/utilities/validation.util';
import { StorageUtil } from '@app/utilities/storage.util';

import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

import { BaseComponent } from '@app/views/base.component';

import { CommonService } from '@app/services/common/common.service';
import { AdminAuthenticationService } from '@app/services/authentication/admin-authentication.service';

import { GlobalProvider } from '@app/providers/global.provider';
import { DialogService } from 'primeng/dynamicdialog';
@Component({
	selector: 'app-auth-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
	public mainForm!: FormGroup;

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
		private formBuilder: FormBuilder,
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
		this._pageTitle.setTitle(
			this._translateService.instant('pages.login.labels.body-title')
		);
	}

	ngOnInit(): void {
		this.mainForm = this.formBuilder.group({
			txtUserName: [
				'root',
				{
					validators: [
						Validators.maxLength(100),
						Validators.required
					],
					asyncValidators: [],
					updateOn: 'blur',
				},
			],
			txtPassword: [
				'123456',
				{
					validators: [
						Validators.minLength(6),
						Validators.maxLength(100),
						Validators.required,
					],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			chbRemember: [true],
		});

		this.mainForm.reset();
	}

	async doLogin() {
		let params: any = {
			adminAccount: this.mainForm.controls.txtUserName.value,
			adminPassword: StringUtil.hashPassword(
				this.mainForm.controls.txtPassword.value
			),
		};

		await this.adminAuthenticationService.doLogin(params)?.subscribe(
			(result) => {
				if (result.responseStatus === 200) {
					StorageUtil.storeValue(
						'adminInfo',
						result.content.datas.adminAccount
					);
					GlobalProvider.adminInfo = result.content.datas.adminAccount;
					this._router.navigate(['/onboarding']);
				} else if (result.responseStatus === 417) {
					this.presentToast(
						EToastType.warning,
						this._translateService.instant(result.content.message)
					);
				} else {
					console.log(result);
					this.presentToast(
						EToastType.error,
						this._translateService.instant(
							'common.errors-message.common-server-error'
						)
					);
				}
			},
			(error) => {
				console.log(error);
				this.presentToast(
					EToastType.error,
					this._translateService.instant(
						'common.errors-message.common-server-error'
					)
				);
			}
		);
	}
}
