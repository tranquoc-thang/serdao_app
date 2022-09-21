import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthenticationService } from '@services/authentication/admin-authentication.service';
import { CommonService } from '@services/common/common.service';
import { ValidationUtil } from '@utilities/validation.util';
import { BaseComponent } from '@views/base.component';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {
	AdminForgotDto,
	AdminResetPasswordDto,
} from '@app/interfaces/dtos/admin.dto';
import { EToastType } from '@app/constants';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
	public mainForm!: FormGroup;

	public formStep: number = 1;

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
		this._pageTitle.setTitle('Quên Mật Khẩu');
	}

	ngOnInit(): void {
		this.mainForm = this.formBuilder.group({
			txtNameAccount: [
				'admin',
				{
					validators: [Validators.maxLength(150), Validators.required],
					asyncValidators: [],
					updateOn: 'blur',
				},
			],

			txtPinCode: [
				'123456',
				{
					validators: [
						Validators.maxLength(6),
						Validators.pattern(
							Environment.validators.patterns.onlyNumeric
						),
						Validators.required,
					],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtPassword: [
				'111111',
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
			txtPasswordConfirm: [
				'111111',
				{
					validators: [
						Validators.minLength(6),
						Validators.maxLength(100),
						Validators.required,
						this._validate.checkMatchOther('txtPassword'),
					],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
		});

		this.mainForm.reset();
	}

	public async doForgotPassword() {
		let params: AdminForgotDto = {
			adminAccount: this.mainForm.controls.txtNameAccount.value,
		};

		await this.adminAuthenticationService.doForgotPassword(params)?.subscribe(
			async (result) => {
				if (result.responseStatus === 200) {
					this.formStep = 2;
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

	public async doResetPassword() {
		this._common.attachSpinner();
		let params: AdminResetPasswordDto = {
			adminAccount: this.mainForm.controls.txtEmail.value,
			adminNewPassword: this.mainForm.controls.txtPasswordConfirm.value,
			adminOldPassword: this.mainForm.controls.txtPassword.value,
			pinCode: this.mainForm.controls.txtPinCode.value,
		};

		await this.adminAuthenticationService.doResetPassword(params)?.subscribe(
			async (result) => {
				if (result.responseStatus === 200) {
					this._router.navigate(['/']);
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
				this._common.detachSpinner();
			},
			(error) => {
				console.log(error);
				this.presentToast(
					EToastType.error,
					this._translateService.instant(
						'common.errors-message.common-server-error'
					)
				);
				this._common.detachSpinner();
			}
		);
	}
}
