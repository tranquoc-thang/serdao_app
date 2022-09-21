import { Dropdown } from 'primeng/dropdown';
import { resolve } from 'path';
import { Component, OnInit, Output, Input } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	NgForm,
	Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import {
	CustomerCreateDto,
	CustomerDto,
	CustomerUpdate,
} from '@app/interfaces/dtos/customer.dto';
import { Province } from '@app/interfaces/models/province.entity';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
	selector: 'app-customer-dialog-content',
	templateUrl: './customer-dialog-content.component.html',
	styleUrls: ['./customer-dialog-content.component.scss'],
})
export class CustomerDialogContentComponent
	extends BaseComponent
	implements OnInit
{
	constructor(
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		_validate: ValidationUtil,
		_toast: ToastrService,
		_dialog: DialogService,
		_translateService: TranslateService,
		private customerService: CustomerService,
		public formBuilder: FormBuilder,
		private _ref: DynamicDialogRef,
		private primeConfig: PrimeNGConfig,
		public config: DynamicDialogConfig,
		public _confirmationService: ConfirmationService
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

	customerCreateForm!: FormGroup;
	provinceList!: Province[];
	displayModal!: boolean;
	currentProvince!: Province | null;
	customerImgs!: Array<File>;
	customerImgFront!: File;
	customerImgBack!: File;
	isCustomerUpdation: boolean = true;

	currentSex!: number;
	currentFoundingDate!: string;
	currentGroup!: number;
	currentBirthday!: string;
	activationEmailStatus: boolean = false;
	currentFile!: File;
	currentFileFront!: File;
	currentFileBack!: File;
	isEdit: boolean = false;
	dataGroupId!: number;
	customer!: CustomerDto;
	customerNo!: string;
	customerBirthday!: Date;
	currentGroupId!: number;
	currentProvinceId!: number;
	currentProvinceName!: string;
	fileUndefined!: File;

	ngOnInit(): void {
		this.isEdit = this.config.data.isEdit;
		this.dataGroupId = this.config.data.groupId;
		this.customerNo = this.config.data.customerNo;
		console.log('on init dialog');
		const overlay: HTMLDivElement = document.querySelector('.p-dialog-mask')!;
		overlay.style.pointerEvents = 'unset';

		this.doGetProfileCustomer(this.customerNo).then((result) => {
			// this.customerImgFront = new File([new Blob()], result.customerIdentificationFront, {
			// 	type: 'image/png',
			// });

			this.currentProvinceId = result.provinceId;
			this.currentProvinceName = result.provinceName;
			this.customerImgFront = result.customerIdentificationFront;
			this.customerImgBack = result.customerIdentificationBack;

			// this.customerImgBack = new File([new Blob()], result.customerIdentificationBack, {
			// 	type: 'image/png',
			// })
			this.customer = result;
			console.log(this.customer);
		});

		this._translateService
			.get('primeng')
			.subscribe((res) => this.primeConfig.setTranslation(res));
		this.customerCreateForm = this.formBuilder.group({
			txtEmail: [
				'',
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
			txtPhoneNumber: [
				'',
				{
					validators: [
						Validators.maxLength(150),
						Validators.pattern(
							Environment.validators.patterns.onlyNumeric
						),
					],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtPassword: [
				'',
				{
					validators: [
						Validators.maxLength(150),
						Validators.pattern(
							Environment.validators.patterns.onlyNumeric
						),
					],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtCompanyName: [
				'',
				{
					validators: [Validators.maxLength(500), Validators.required],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtName: [
				'',
				{
					validators: [Validators.maxLength(50), Validators.required],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtIdentification: [
				'',
				{
					validators: [
						Validators.maxLength(150),
						Validators.pattern(
							Environment.validators.patterns.onlyNumeric
						),
					],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtBirthday: [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtAddress: [
				'',
				{
					validators: [Validators.maxLength(1000)],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtAuthorizedDealer: [
				'',
				{
					validators: [Validators.maxLength(100)],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			file: new FormControl('', [Validators.required]),
		});
	}

	// createCustomer() {
	// 	const newCustomer: CustomerCreateDto = {
	// 		customerPhone: this.customerCreateForm.value.txtPhoneNumber,
	// 		customerEmail: this.customerCreateForm.value.txtEmail,
	// 		customerName: this.customerCreateForm.value.txtName,
	// 		companyName: this.customerCreateForm.value.txtCompanyName,
	// 		customerIdentification:
	// 			this.customerCreateForm.value.txtIdentification,
	// 		customerBirthday: this.currentBirthday,
	// 		customerAddress: this.customerCreateForm.value.txtAddress,
	// 		customerProvinceId: this.currentProvince?.provinceId,
	// 		customerProvinceName: this.currentProvince?.provinceName,
	// 		customerGroup: this.currentGroup,
	// 		customerIdentificationFront: this.currentFile,
	// 		customerIdentificationBack: this.currentFile,
	// 	};
	// 	this.customerService.createCustomer(newCustomer)?.subscribe(
	// 		(result) => {
	// 			if (result.responseStatus === 200) {
	// 				this.presentToast(
	// 					EToastType.success,
	// 					this._translateService.instant(result.content.message)
	// 				);
	// 				this._ref.close();
	// 			} else if (result.responseStatus === 417) {
	// 				this.presentToast(
	// 					EToastType.warning,
	// 					this._translateService.instant(result.content.message)
	// 				);
	// 			} else {
	// 				console.log(result);
	// 				this.presentToast(
	// 					EToastType.error,
	// 					this._translateService.instant(
	// 						'common.errors-message.common-server-error'
	// 					)
	// 				);
	// 			}
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 			this.presentToast(
	// 				EToastType.error,
	// 				this._translateService.instant(
	// 					'common.errors-message.common-server-error'
	// 				)
	// 			);
	// 		}
	// 	);
	// }

	get email() {
		return this.customerCreateForm.get('email');
	}

	getDate($event: any) {
		// this.currentBirthday = $event.value;
		let d = new Date(Date.parse($event));
		this.currentBirthday = `${d.getFullYear()}/${
			d.getMonth() + 1
		}/${d.getDate()}`;
	}

	getGroup($event: number) {
		this.currentGroupId = $event;
	}

	getSex($event: any) {
		this.currentSex = $event;
	}

	getProvince($event: any) {
		this.currentProvinceId = $event.value;
		// this.currentProvinceName = $event.value.provinceName;
	}

	getProvinced($event: Province) {
		this.currentProvinceId = $event.provinceId;
		this.currentProvinceName = $event.provinceName;
	}

	isDisable(): boolean {
		return this.customerCreateForm.valid;
	}

	onSelectEvent($event: any) {
		console.log($event);

		this.currentFile = $event;
	}

	identityUpload($event: any) {
		this.currentFile = $event.currentFiles[0];
	}

	doVerificationCustomer(
		slug: string,
		activeStatus: number,
		message?: string
	) {
		console.log('click verify');
		this._common.attachSpinner();
		this.customerService
			.doVerificationCustomer(slug, activeStatus)
			?.subscribe(
				(result) => {
					if (result.responseStatus === 200) {
						this._common.detachSpinner();
						this.presentToast(
							EToastType.success,
							this._translateService.instant(result.content.message)
						);
						// this.openDialog(result.content.datas.companyProfile);
						console.log('do verify: ', result);
					} else if (result.responseStatus === 417) {
						this.presentToast(
							EToastType.warning,
							this._translateService.instant(result.content.message)
						);
						this._common.detachSpinner();
					} else {
						this.presentToast(
							EToastType.error,
							this._translateService.instant(result.content.message)
						);
						this._common.detachSpinner();
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
					this._common.detachSpinner();
				}
			);
	}

	doDelete(slug: string, message?: string) {
		// this._confirmationService.confirm({
		// 	message: message,
		// 	accept: () =>
		this.customerService.doDeleteNewCustomer(slug)?.subscribe(
			(result) => {
				if (result.responseStatus === 200) {
					this.presentToast(
						EToastType.success,
						this._translateService.instant(result.content.message)
					);
					console.log('delete new customer: ', result);
					// this.getCompanyList();
				} else if (result.responseStatus === 417) {
					this.presentToast(
						EToastType.warning,
						this._translateService.instant(result.content.message)
					);
				} else {
					this.presentToast(
						EToastType.error,
						this._translateService.instant(result.content.message)
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
		// });
	}

	doGetProfileCustomer(slug: string): Promise<any> {
		return new Promise((resolve, rejects) => {
			this.customerService.getProfileCustomer(slug)?.subscribe(
				(result): any => {
					if (result.responseStatus === 200) {
						this.presentToast(
							EToastType.success,
							this._translateService.instant(result.content.message)
						);
						this.customer = result.content.datas.customerDetail;
						this.customerBirthday = new Date(
							this.customer.customerBirthday
						);
						this.checkIfImageExists(
							this.customer.customerIdentificationFront
						);
						this.checkIfImageExists(
							this.customer.customerIdentificationBack
						);

						resolve(result.content.datas.customerDetail);
					} else if (result.responseStatus === 417) {
						this.presentToast(
							EToastType.warning,
							this._translateService.instant(result.content.message)
						);
						rejects('Something Wrong');
					} else {
						console.log(result);
						this.presentToast(
							EToastType.error,
							this._translateService.instant(
								'common.errors-message.common-server-error'
							)
						);

						rejects('Something Wrong');
					}
					rejects('Something Wrong');
				},
				(error) => {
					console.log(error);
					this.presentToast(
						EToastType.error,
						this._translateService.instant(
							'common.errors-message.common-server-error'
						)
					);

					rejects('Something Wrong');
				}
			);
		});
	}

	updateCustomer() {
		this.currentBirthday = `${this.customerBirthday.getFullYear()}-${
			this.customerBirthday.getMonth() + 1
		}-${this.customerBirthday.getDate()}`;
		// const updateCustomer: CustomerUpdate = {
		// 	customerPhone: this.customerCreateForm.value.txtPhoneNumber,
		// 	customerEmail: this.customerCreateForm.value.txtEmail,
		// 	customerName: this.customerCreateForm.value.txtName,
		// 	companyName: this.customerCreateForm.value.txtCompanyName,
		// 	customerIdentification:
		// 		this.customerCreateForm.value.txtIdentification,
		// 	customerBirthday:
		// 		this.currentBirthday || this.customerBirthday.toString(),
		// 	customerAddress: this.customerCreateForm.value.txtAddress,
		// 	customerProvinceId: this.currentProvinceId || this.customer.provinceId,
		// 	customerProvinceName:
		// 		this.currentProvinceName || this.customer.provinceName,
		// 	// customerGroup: this.currentGroup,
		// 	customerIdentificationFront: this.currentFileFront,
		// 	customerIdentificationBack: this.currentFileBack,
		// };

		// const formData = new FormData()

		// formData.append('customerPhone', this.customerCreateForm.value.txtPhoneNumber)
		// formData.append('customerEmail', this.customerCreateForm.value.txtEmail)
		// formData.append('customerName', this.customerCreateForm.value.txtName)
		// formData.append('customerIdentification', this.customerCreateForm.value.txtIdentification)
		// formData.append('customerBirthday', this.currentBirthday || this.customerBirthday.toString())
		// formData.append('customerAddress', this.customerCreateForm.value.txtAddress)
		// formData.append('customerProvinceName', this.currentProvinceName || this.customer.provinceName)
		// formData.append('customerProvinceId', this.customer.provinceId.toString())
		// formData.append('customerIdentificationFront', this.currentFileFront)
		// formData.append('customerIdentificationBack', this.currentFileBack)
		// formData.append('companyName', this.customerCreateForm.value.txtCompanyName)
		// console.log('formData', formData)
		let formData = new FormData();
		console.log('id', this.currentProvinceId, this.customer.provinceId);
		console.log('name', this.currentProvinceName, this.customer.provinceName);
		console.log(this.currentFileFront, this.customerImgFront);
		console.log(this.currentFileBack, this.customerImgBack);

		formData.append(
			'customerIdentificationFront',
			this.currentFileFront || this.customerImgFront
		);
		formData.append(
			'customerIdentificationBack',
			this.currentFileBack || this.customerImgBack
		);
		formData.append(
			'customerPhone',
			this.customerCreateForm.value.txtPhoneNumber
		);
		formData.append('customerEmail', this.customerCreateForm.value.txtEmail);
		formData.append('customerName', this.customerCreateForm.value.txtName);
		formData.append(
			'companyName',
			this.customerCreateForm.value.txtCompanyName
		);
		formData.append(
			'customerIdentification',
			this.customerCreateForm.value.txtIdentification
		);
		formData.append(
			'customerBirthday',
			this.currentBirthday || this.customerBirthday.toString()
		);
		formData.append(
			'customerAddress',
			this.customerCreateForm.value.txtAddress
		);
		formData.append('customerProvinceId', `${this.currentProvinceId}`);
		formData.append('customerProvinceName', this.currentProvinceName);

		this.customerService
			.updateNewCustomer(formData, this.customerNo)
			?.subscribe(
				(res: any) => {
					if (res.type === HttpEventType.UploadProgress) {
						//add progress bar
						// this.progress = Math.round(100 * event.loaded / event.total);
					} else if (res instanceof HttpResponse) {
						let result = res.body;
						console.log(result);
						if (result.responseStatus === 200) {
							this.presentToast(
								EToastType.success,
								this._translateService.instant(result.content.message)
							);
							// this._ref.close();
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

	onSelectFront($event: any) {
		// this.currentFileFront = $event.currentFiles[0];
		let selectedFiles: FileList = $event.files;
		this.currentFileFront = selectedFiles[0];
		console.log(this.currentFileFront);
	}

	onSelectBack($event: any) {
		// this.currentFileBack = $event.currentFiles[0];

		let selectedFiles: FileList = $event.files;
		this.currentFileBack = selectedFiles[0];
		console.log(this.currentFileBack);
	}

	handleDeletionRequestingProfile() {
		this.doDelete(
			this.customerNo,
			'Bạn muốn xóa yêu cầu cập nhật thông tin của khách hàng này?'
		);
	}

	onRemoveFront($event: any) {
		this.currentFileFront = this.fileUndefined;
		console.log(this.currentFileFront);
	}

	onRemoveBack($event: any) {
		this.currentFileBack = this.fileUndefined;
		console.log(this.currentFileBack);
	}

	handleShowFront($event: any) {
		this.currentFileFront = this.customerImgFront;
	}

	handleShowBack($event: any) {
		this.currentFileBack = this.customerImgBack;
	}
}
