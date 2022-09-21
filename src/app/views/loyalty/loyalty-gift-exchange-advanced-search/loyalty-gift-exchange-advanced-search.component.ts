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
import {
	ExchangeGiftResponse,
	GiftExchangeSearch,
} from '@app/interfaces/dtos/exchange-gift.dto';
import { GroupList } from '@app/interfaces/models/group.entity';
import { MemberShip } from '@app/interfaces/models/member-ship.entity';
import { Province } from '@app/interfaces/models/province.entity';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { GiftExchangeService } from '@app/services/gift/gift-exchange.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-loyalty-gift-exchange-advanced-search',
	templateUrl: './loyalty-gift-exchange-advanced-search.component.html',
	styleUrls: ['./loyalty-gift-exchange-advanced-search.component.scss'],
})
export class LoyaltyGiftExchangeAdvancedSearchComponent
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
		public formBuilder: FormBuilder,
		private primeConfig: PrimeNGConfig,
		private customerService: CustomerService,
		private _ref: DynamicDialogRef,
		private giftExchangeSearch: GiftExchangeService
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
	@Output() searchEvent = new EventEmitter<GiftExchangeSearch>();

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

	searchGiftExchange() {
		const newGiftExchange: GiftExchangeSearch = {
			page: this.currentPages,
			recipientPhone: this.customerSearch.value.txtPhoneNumber,
			customerNo: this.customerSearch.value.txtCustomerNo,
			recipientAddress: this.customerSearch.value.txtAddress,
			recipientProvinceId: this.currentProvince?.provinceId,
		};
		console.log('newGiftExchange: ', newGiftExchange);
		this.giftExchangeSearch
			.advancedSearchGiftExchange(newGiftExchange)
			?.subscribe(
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

	getProvinces($event: any) {
		console.log($event);
		this.currentProvinceId = $event.value;
	}

	getProvinced($event: Province) {
		console.log($event);
		this.currentProvince = $event;
	}

	isDisable(): boolean {
		return this.customerSearch.valid;
	}

	getProvince($event: any) {
		this.currentProvince = $event.value;
	}
}
