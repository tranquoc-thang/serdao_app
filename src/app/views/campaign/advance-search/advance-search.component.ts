import { CampaignService } from './../../../services/campaign/campaign.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { CampaignSearch } from '@app/interfaces/dtos/campaign.dto';
import { ProductDto } from '@app/interfaces/dtos/product.dto';
import { CommonService } from '@app/services/common/common.service';
import { QrCodeService } from '@app/services/qrcode/qrcode.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PrimeNGConfig } from 'primeng/api';
import { Environment } from '@environments/environment';
import { GroupList } from '@app/interfaces/models/group.entity';
@Component({
	selector: 'campaign-advance-search',
	templateUrl: './advance-search.component.html',
	styleUrls: ['./advance-search.component.scss'],
})
export class AdvanceSearchComponent extends BaseComponent {
	activeCheck: boolean = false;
	unactiveCheck: boolean = false;

	campaignsTypeList!: {}[];
	productList!: ProductDto[];
	selectedProduct!: ProductDto;
	campaignSearchForm!: FormGroup;
	currentDob!: string;
	checked: boolean = true;
	currentPages!: number;
	itemPage!: string;
	currentGroupId!: number;
	currentGroup!: GroupList | null;
	@Input() isCampaignList: boolean = true;

	@Output() searchEvent = new EventEmitter<CampaignSearch>();
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
		public campaignService: CampaignService,
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
		this.campaignSearchForm = this.formBuilder.group({
			txtCampaignType: [
				'',
				{
					validators: [],
					asyncValidators: [
						// this._validate.emailExistingValidator('cd', 'cm', true),
					],
					updateOn: 'change',
				},
			],
			txtCampaignTitle: [
				'',
				{
					validators: [Validators.maxLength(50)],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			txtCampaignStatus: [
				false,
				{
					validators: [Validators.maxLength(50)],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
		});
		this.initializePage();
		this.campaignsTypeList = [
			{
				campaignNo: 0,
				campaignType: 'Chọn chiến dịch',
			},
			{
				campaignNo: 1,
				campaignType: 'Chiến Dịch 1',
			},
			{
				campaignNo: 2,
				campaignType: 'Chiến Dịch 2',
			},
			{
				campaignNo: 3,
				campaignType: 'Chiến Dịch 3',
			},
		];
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

	searchCampaign() {
		const newCampaign: CampaignSearch = {
			page: this.currentPages,
			itemPerPage: this.itemPage,
			campaignType: this.campaignSearchForm.value.txtCampaignType,
			groupId: this.currentGroupId,
			campaignTitle: this.campaignSearchForm.value.txtCampaignTitle,
		};
		console.log('newCampaign: ', newCampaign);
		if (this.isCampaignList) {
			this.campaignService.advancedSearch(newCampaign)?.subscribe(
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
			this.campaignService.advancedSearch(newCampaign)?.subscribe(
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
	getDate($event: any) {
		// this.currentBirthday = $event.value;
		let d = new Date(Date.parse($event));
		this.currentDob = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
	}
	getGroups($event: number) {
		this.currentGroupId = $event;
	}
	getGroup($event: GroupList) {
		console.log($event);
		this.currentGroup = $event;
	}

	// changeActive() {
	// 	if (this.activeCheck && this.unactiveCheck) {
	// 		this.campaignSearchForm.get('txtCampaignStatus')?.setValue(false);
	// 	}
	// 	if (!this.activeCheck && !this.unactiveCheck) {
	// 		this.campaignSearchForm.get('txtCampaignStatus')?.setValue(false);
	// 	}
	// 	if (this.activeCheck && !this.unactiveCheck) {
	// 		this.campaignSearchForm.get('txtCampaignStatus')?.setValue(true);
	// 	}
	// 	if (!this.activeCheck && !this.unactiveCheck) {
	// 		this.campaignSearchForm.get('txtCampaignStatus')?.setValue(false);
	// 	}
	// }
}
