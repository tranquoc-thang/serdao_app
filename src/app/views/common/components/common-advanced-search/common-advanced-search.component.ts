import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import {
	CustomerSearch,
	CustomerRequestingUpdationSearch,
	CustomerDto,
} from '@app/interfaces/dtos/customer.dto';
import { GroupList } from '@app/interfaces/models/group.entity';
import { MemberShip } from '@app/interfaces/models/member-ship.entity';
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
@Component({
	selector: 'app-common-advanced-search',
	templateUrl: './common-advanced-search.component.html',
	styleUrls: ['./common-advanced-search.component.scss'],
})
export class CommonAdvancedSearchComponent
	extends BaseComponent
	implements OnInit
{
	constructor(
		private commonService: CommonService,
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		_validate: ValidationUtil,
		_toast: ToastrService,
		_dialog: DialogService,
		_translateService: TranslateService,
		public formBuilder: FormBuilder,
		private primeConfig: PrimeNGConfig,
		private customerService: CustomerService,
		private _ref: DynamicDialogRef
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
	@Input() isCustomerList: boolean = true;
	@Input() isCustomerNewList: boolean = false;
	@Input() isCustomerUpdation!: boolean;

	@Output() newCustomerRequestingListEvent = new EventEmitter<CustomerDto[]>();
	@Output() searchEvent = new EventEmitter<CustomerSearch>();

	currentRank!: number;
	customerSearch!: FormGroup;
	currentProvince!: Province | null;
	currentGroup!: GroupList | null;
	currentMembership!: MemberShip | null;
	currentGroupId!: number;
	currentProvinceId!: number;
	currentMembershipId!: number;
	currentPages!: number;
	itemPage!: string;
	newCustomerRequestingUpdationList!: CustomerDto[];

	public currentPage: {
		first: number;
		rows: number;
		page: number;
		pageCount: number;
	} = { first: 0, rows: 10, page: 0, pageCount: 10 };

	ngOnInit(): void {
		this._translateService
			.get('primeng')
			.subscribe((res) => this.primeConfig.setTranslation(res));
		this.customerSearch = this.formBuilder.group({
			txtEmail: [
				'',
				{
					validators: [
						Validators.maxLength(150),
						Validators.pattern(Environment.validators.patterns.email),
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
						Validators.maxLength(12),
						Validators.minLength(8),
						Validators.pattern(
							Environment.validators.patterns.onlyNumeric
						),
					],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtCustomerNo: [
				'',
				{
					validators: [Validators.maxLength(18)],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtCompanyName: [
				'',
				{
					validators: [Validators.maxLength(100)],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtName: [
				'',
				{
					validators: [Validators.maxLength(50)],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtIdentification: [
				'',
				{
					validators: [
						Validators.maxLength(50),
						Validators.pattern(
							Environment.validators.patterns.onlyNumeric
						),
					],
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
		});
	}

	searchCustomerRequestingUpdation() {
		const searchCustomer: CustomerRequestingUpdationSearch = {
			page: this.currentPage.page + 1,
			itemPerPage: this.currentPage.rows.toString(),
			customerAddress: this.customerSearch.value.txtAddress,
			customerEmail: this.customerSearch.value.txtEmail,
			customerIdentification: this.customerSearch.value.txtIdentification,
			customerName: this.customerSearch.value.txtName,
			customerNo: this.customerSearch.value.txtCustomerNo,
			customerPhone: this.customerSearch.value.txtPhoneNumber,
			groupId: this.currentGroup?.groupId || 0,
			provinceId: this.currentProvince?.provinceId,
			companyName: this.customerSearch.value.txtCompanyName,
		};

		console.log('searchCustomer', searchCustomer);

		this.customerService
			.advancedSearchRequestingUpdation(searchCustomer)
			?.subscribe(
				(result) => {
					if (result.responseStatus === 200) {
						console.log(result);

						this.newCustomerRequestingUpdationList =
							result.content.datas.datasList;

						this.addNewCustomerRequestingUpdationList(
							this.newCustomerRequestingUpdationList
						);
						this.presentToast(
							EToastType.success,
							this._translateService.instant(result.content.message)
						);
						this._ref.close();
					} else if (result.responseStatus === 417) {
						this.presentToast(
							EToastType.warning,
							this._translateService.instant(result.content.message)
						);
					} else {
						this.presentToast(
							EToastType.error,
							this._translateService.instant(
								'common.errors-message.common-server-error'
							)
						);
					}
				},
				(error) => {
					console.error(error);
					this.presentToast(
						EToastType.error,
						this._translateService.instant(
							'common.errors-message.common-server-error'
						)
					);
				}
			);
	}

	searchCustomer() {
		const newCustomer: CustomerSearch = {
			page: this.currentPages,
			itemPerPage: this.itemPage,
			customerPhone: this.customerSearch.value.txtPhoneNumber,
			customerEmail: this.customerSearch.value.txtEmail,
			customerName: this.customerSearch.value.txtName,
			companyName: this.customerSearch.value.txtCompanyName,
			customerNo: this.customerSearch.value.txtCustomerNo,
			customerIdentification: this.customerSearch.value.txtIdentification,
			customerAddress: this.customerSearch.value.txtAddress,
			provinceId: this.currentProvince?.provinceId,
			groupId: this.currentGroupId,
			membershipId: this.currentMembership?.membershipId || 0,
		};
		console.log('newCustomer: ', newCustomer);
		if (this.isCustomerNewList) {
			this.customerService.advancedSearchNewCustomer(newCustomer)?.subscribe(
				(result) => {
					if (result.responseStatus === 200) {
						this.presentToast(
							EToastType.success,
							this._translateService.instant(result.content.message)
						);
						this.searchEvent.emit(result.content.datas.datasList);
						this._ref.close();
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
		} else {
			this.customerService.advancedSearch(newCustomer)?.subscribe(
				(result) => {
					if (result.responseStatus === 200) {
						this.presentToast(
							EToastType.success,
							this._translateService.instant(result.content.message)
						);
						this.searchEvent.emit(result.content.datas.datasList);
						this._ref.close();
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

	getProvinces($event: any) {
		console.log($event);
		this.currentProvinceId = $event.value;
	}

	getGroups($event: number) {
		this.currentGroupId = $event;
	}
	addNewCustomerRequestingUpdationList(
		newCustomerRequestingUpdationList: CustomerDto[]
	) {
		this.newCustomerRequestingListEvent.emit(
			newCustomerRequestingUpdationList
		);
	}

	getProvinced($event: Province) {
		console.log($event);
		this.currentProvince = $event;
	}

	getGroup($event: GroupList) {
		console.log($event);
		this.currentGroup = $event;
	}

	getMember($event: MemberShip) {
		console.log('member', $event);
		this.currentMembership = $event;
	}

	isDisable(): boolean {
		return this.customerSearch.valid;
	}

	getProvince($event: any) {
		this.currentProvince = $event.value;
	}

	getCustomerRank($event: any) {
		this.currentRank = $event.value;
	}
}
