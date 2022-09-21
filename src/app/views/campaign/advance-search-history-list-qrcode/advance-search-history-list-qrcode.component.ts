import { QrcodeHistoryListComponent } from './../qrcode-history-list/qrcode-history-list.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { ProductDto } from '@app/interfaces/dtos/product.dto';
import { QrcodeSearch } from '@app/interfaces/dtos/qrcode.dto';
import { GroupList } from '@app/interfaces/models/group.entity';
import { CommonService } from '@app/services/common/common.service';
import { QrCodeService } from '@app/services/qrcode/qrcode.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'app-advance-search-history-list-qrcode',
	templateUrl: './advance-search-history-list-qrcode.component.html',
	styleUrls: ['./advance-search-history-list-qrcode.component.scss'],
})
export class AdvanceSearchHistoryListQrcodeComponent extends BaseComponent {
	productList!: ProductDto[];
	selectedProduct!: ProductDto;
	qrcodeForm!: FormGroup;
	currentGroupId!: number;
	currentGroup!: GroupList | null;
	currentPages!: number;
	itemPage!: string;
	currentProductId!: number;
	@Input() isQRsHistoryList: boolean = true;
	@Input() campaignId: number = -1;
	@Output() searchEvent = new EventEmitter<QrcodeHistoryListComponent>();
	constructor(
		private fb: FormBuilder,
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		_validate: ValidationUtil,
		_toast: ToastrService,
		_translateService: TranslateService,
		_dialog: DialogService,
		public qrcodeService: QrCodeService,
		public _confirmationService: ConfirmationService,
		private primeConfig: PrimeNGConfig,
		public formBuilder: FormBuilder,
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
		this.qrcodeForm = this.formBuilder.group({
			txtCustomerNo: [
				'',
				{
					validators: [],
					asyncValidators: [
						// this._validate.emailExistingValidator('cd', 'cm', true),
					],
					updateOn: 'change',
				},
			],
			txtQrUsedDate: [
				'',
				{
					validators: [Validators.maxLength(50)],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtQrCode: [
				'',
				{
					validators: [Validators.maxLength(50)],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
		});
		this.initializePage();
	}

	initializePage() {
		this.getPackingList();
	}

	async getPackingList() {
		forkJoin({
			productList: this.qrcodeService.getProductList(),
		})
			.pipe(delay(this.loadingTime))
			.subscribe(
				(result) => {
					if (result.productList.responseStatus === 200) {
						this.productList =
							result.productList.content.datas.producstList;
						this.presentToast(
							EToastType.success,
							this._translateService.instant(
								result.productList.content.message
							)
						);
					} else if (result.productList.responseStatus === 417) {
						this.presentToast(
							EToastType.warning,
							this._translateService.instant(
								result.productList.content.message
							)
						);
					} else {
						this.presentToast(
							EToastType.error,
							this._translateService.instant(
								result.productList.content.message
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

	findPacking() {
		const newPacking: QrcodeSearch = {
			page: this.currentPages,
			itemPerPage: this.itemPage,
			customerNo: this.qrcodeForm.value.txtCustomerNo,
			productId: this.currentProductId,
			groupId: this.currentGroupId,
			qrUsedDate: this.qrcodeForm.value.txtQrUsedDate,
			qrCode: this.qrcodeForm.value.txtQrCode,
			// campaignType: this.campaignSearchForm.value.txtCustomerNo,
			// groupId: this.currentGroupId,
			// campaignTitle: this.campaignSearchForm.value.txtCampaignTitle,
		};
		console.log('new packing: ', newPacking);
		if (this.isQRsHistoryList) {
			this.qrcodeService
				.advancedSearch(newPacking, this.campaignId)
				?.subscribe(
					(result) => {
						if (result.responseStatus === 200) {
							this.presentToast(
								EToastType.success,
								this._translateService.instant(result.content.message)
							);
							this.searchEvent.emit(result.content.datas.datasList);
							console.log(result.content.datas.datasList);
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
			this.qrcodeService
				.advancedSearch(newPacking, this.campaignId)
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
	}
	getGroups($event: number) {
		this.currentGroupId = $event;
	}
	getGroup($event: GroupList) {
		console.log($event);
		this.currentGroup = $event;
	}
	getProductId($event: any) {
		this.currentProductId = $event.value;
		console.log(this.currentProductId);
	}
}
