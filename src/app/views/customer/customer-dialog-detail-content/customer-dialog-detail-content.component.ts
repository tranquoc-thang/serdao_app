import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
	FormControl,
	FormGroup,
	NgForm,
	Validators,
	FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import {
	CompanyDto,
	CompanyGetDetailDto,
	CompanyUpdateDto,
} from '@app/interfaces/dtos/company.dto';
import { Province } from '@app/interfaces/models/province.entity';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';

import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { timeStamp } from 'console';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-customer-dialog-detail-content',
	templateUrl: './customer-dialog-detail-content.component.html',
	styleUrls: ['./customer-dialog-detail-content.component.scss'],
})
export class CustomerDialogDetailContentComponent
	extends BaseComponent
	implements OnInit, OnDestroy
{
	constructor(
		private customerService: CustomerService,
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		_validate: ValidationUtil,
		_toast: ToastrService,
		_translateService: TranslateService,
		_dialog: DialogService,
		public formBuilder: FormBuilder,
		public ref: DynamicDialogRef,
		private primeConfig: PrimeNGConfig
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
	}
	displayModal!: boolean;
	detailCompany!: CompanyGetDetailDto;
	currentCompany!: CompanyDto;
	@Input() data!: any;
	companyEditForm!: FormGroup;
	currentProvince!: Province;
	currentSex!: number;
	currentType!: number;
	currentFoundingDate!: string;
	createDate!: string;
	date!: Date;

	ngOnInit(): void {
		this.detailCompany = this.customerService.detailCompany;
		this._translateService
			.get('primeng')
			.subscribe((res) => this.primeConfig.setTranslation(res));
		if (this.detailCompany.companyFoundingDate) {
			this.currentFoundingDate = this.detailCompany.companyFoundingDate;
			this.date = new Date(this.currentFoundingDate);
		}

		if (this.detailCompany.companyTypeOfBusiness) {
			this.currentType = this.detailCompany.companyTypeOfBusiness;
		}
		// }
		this.companyEditForm = this.formBuilder.group({
			txtEmail: [
				this.detailCompany.companyEmail,
				{
					validators: [
						Validators.maxLength(150),
						Validators.pattern(Environment.validators.patterns.email),
						Validators.required,
					],
					asyncValidators: [
						// this._validate.emailExistingValidator('cd', 'cm', true),
					],
					updateOn: 'change',
				},
			],
			txtCompanyName: [
				this.detailCompany.companyName,
				{
					validators: [Validators.maxLength(150), Validators.required],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtFirstName: [
				this.detailCompany.companyOwnerFirstName,
				{
					validators: [Validators.maxLength(50), Validators.required],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			// txtLastName: [
			// 	this.detailCompany.companyOwnerLastName,
			// 	{
			// 		validators: [],
			// 		asyncValidators: [],
			// 		updateOn: 'change',
			// 	},
			// ],
			txtKanjiFirstName: [
				this.detailCompany.companyOwnerKanaFirstName,
				{
					validators: [
						Validators.maxLength(100),
						Validators.pattern(
							Environment.validators.patterns.anphabetFullJapanese
						),
					],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			// txtKanjiLastName: [
			// 	this.detailCompany.companyOwnerKanaLastName,
			// 	{
			// 		validators: [
			// 			Validators.maxLength(50),
			// 			Validators.pattern(
			// 				Environment.validators.patterns.anphabetFullJapanese
			// 			),
			// 		],
			// 		asyncValidators: [],
			// 		updateOn: 'change',
			// 	},
			// ],
			// txtFoundingDate: [
			// 	this.date ? this.date : '',
			// 	{
			// 		validators: [

			// 		],
			// 		asyncValidators: [],
			// 		updateOn: 'change',
			// 	},
			// ],
			txtPhoneNumber: [
				this.detailCompany.companyOwnerPhone,
				{
					validators: [
						Validators.maxLength(30),
						Validators.pattern(
							Environment.validators.patterns.onlyNumeric
						),
					],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			// txtNumberOfEmployee: [
			// 	this.detailCompany.companyNumberOfEmployees,
			// 	{
			// 		validators: [
			// 			Validators.maxLength(100),
			// 			Validators.pattern(Environment.validators.patterns.onlyNumeric),
			// 		],
			// 		asyncValidators: [],
			// 		updateOn: 'change',
			// 	}
			// ],
			txtPostalCode: [
				this.detailCompany.companyPostalCode,
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtAddress: [
				this.detailCompany.companyAddress,
				{
					validators: [Validators.maxLength(1000)],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
		});
	}

	ngOnDestroy() {
		console.log('destroyed');
	}

	//update Company
	// updateCompany() {
	// 	let newCompany: CompanyDto = {
	// 		companyId: '',
	// 		companyEmail: this.companyEditForm.value.txtEmail,
	// 		ownerFirstName: this.companyEditForm.value.txtFirstName,
	// 		// ownerLastName: this.companyEditForm.value.txtLastName,
	// 		ownerKanaFirstName: this.companyEditForm.value.txtKanjiFirstName,
	// 		// ownerKanaLastName: this.companyEditForm.value.txtKanjiLastName,
	// 		companyName: this.companyEditForm.value.txtCompanyName,
	// 		ownerPhone: this.companyEditForm.value.txtPhoneNumber,
	// 		companyNumberOfEmployee:
	// 			this.companyEditForm.value.txtNumberOfEmployee,
	// 		// companyFoundingDate: this.currentFoundingDate,
	// 		companyTypeOfBusiness: this.currentType,
	// 		// ownerBirthday: this.currentBirthday,
	// 		ownerSex: this.currentSex,
	// 		companyPostalCode: this.companyEditForm.value.txtPostalCode,
	// 		companyAddress: this.companyEditForm.value.txtAddress,
	// 		provinceId: this.currentProvince?.provinceId,
	// 		provinceName: this.currentProvince?.provinceName,
	// 		cityId: this.currentCity?.cityId,
	// 		cityName: this.currentCity?.cityName,
	// 		sendActivationStatus: 0,
	// 	};
	// 	const companyUpdate: CompanyUpdateDto = {
	// 		companyId: this.detailCompany.companyId,
	// 		newCompany: newCompany,
	// 	};
	// 	this.companyService.updateCompany(companyUpdate)?.subscribe((result) => {
	// 		if (result.responseStatus === 200) {
	// 			this.presentToast(
	// 				EToastType.success,
	// 				this._translateService.instant(result.content.message)
	// 			);
	// 			this.ref.close();
	// 		} else if (result.responseStatus === 417) {
	// 			this.presentToast(
	// 				EToastType.warning,
	// 				this._translateService.instant(result.content.message)
	// 			);
	// 		} else {
	// 			this.presentToast(
	// 				EToastType.error,
	// 				this._translateService.instant(
	// 					'common.errors-message.common-server-error'
	// 				)
	// 			);
	// 		}
	// 	});
	// }

	//resend email
	// sendActivateEmail() {
	// 	this.companyService
	// 		.sendActivateEmail(this.detailCompany.companyEmail)
	// 		?.subscribe(
	// 			(result) => {
	// 				if (result.responseStatus === 200) {
	// 					this.presentToast(
	// 						EToastType.success,
	// 						this._translateService.instant(result.content.message)
	// 					);
	// 				} else if (result.responseStatus === 417) {
	// 					this.presentToast(
	// 						EToastType.warning,
	// 						this._translateService.instant(result.content.message)
	// 					);
	// 				} else {
	// 					this.presentToast(
	// 						EToastType.error,
	// 						this._translateService.instant(result.content.message)
	// 					);
	// 				}
	// 			},
	// 			(error) => {
	// 				this.presentToast(
	// 					EToastType.error,
	// 					this._translateService.instant(
	// 						'common.errors-message.common-server-error'
	// 					)
	// 				);
	// 			}
	// 		);
	// }
	getProvince($event: Province) {
		this.currentProvince = $event;
	}
	getSex($event: any) {
		this.currentSex = $event;
	}
	getType($event: any) {
		this.currentType = $event;
	}
	getDate($event: any) {
		// this.currentBirthday = $event.value;
		let d = new Date(Date.parse($event));
		this.currentFoundingDate = `${d.getFullYear()}/${
			d.getMonth() + 1
		}/${d.getDate()}`;
	}

	getCreateDate($event: any) {
		this.createDate = $event.value;
	}
	get email() {
		return this.companyEditForm.get('email');
	}

	isDisable(): boolean {
		return this.companyEditForm.valid;
	}
}
