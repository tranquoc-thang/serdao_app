import { CampaignService } from './../../../services/campaign/campaign.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { CustomerDto } from '@app/interfaces/dtos/customer.dto';
import { ProductDto } from '@app/interfaces/dtos/product.dto';
import { QrPackingDto } from '@app/interfaces/dtos/qrcode.dto';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { QrCodeService } from '@app/services/qrcode/qrcode.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'app-qrcode-history-list',
	templateUrl: './qrcode-history-list.component.html',
	styleUrls: ['./qrcode-history-list.component.scss'],
})
export class QrcodeHistoryListComponent extends BaseComponent {
	qrHistoryList!: QrcodeHistoryListComponent[];
	productList!: ProductDto[];
	campaignId!: number;
	campaignIdSearch!: number;
	public customerList!: CustomerDto[];
	public currentPage: {
		first: number;
		rows: number;
		page: number;
		pageCount: number;
	} = { first: 0, rows: 10, page: 0, pageCount: 10 };
	public totalRecords!: number;
	public pageLinks!: number;
	public state: any = {};
	constructor(
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		_validate: ValidationUtil,
		_toast: ToastrService,
		_translateService: TranslateService,
		_dialog: DialogService,
		public campaignService: CampaignService,
		public qrcodeService: QrCodeService,
		public _confirmationService: ConfirmationService,
		private matDialog: MatDialog
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
		this.state = this._router.getCurrentNavigation()?.extras.state;
		this._pageTitle.setTitle(
			this._translateService.instant('pages.qrcode.labels.page-title')
		);
	}

	ngOnInit(): void {
		console.log(this.state);
		this.campaignId = this.state.campaignId;
		this.initializePage();
	}

	initializePage() {
		this.getPackingList();
	}
	async getPackingList() {
		this._common.attachSpinner();
		forkJoin({
			response: this.campaignService.getQrHistoryList({
				page: 1,
				itemPerPage: '10',
				productId: 0,
			}, this.campaignId),
			productList: this.qrcodeService.getProductList(),
		})
			.pipe(delay(this.loadingTime))
			.subscribe(
				(result) => {
					if (result.response.responseStatus === 200) {
						this.qrHistoryList = result.response.content.datas.datasList;
						this.productList =
							result.productList.content.datas.producstList;
						if (this.qrHistoryList.length<1){
							this.presentToast(
								EToastType.success,
								this._translateService.instant(
									result.response.content.message
								)
								);
						}else{
							this.presentToast(
								EToastType.warning,
								this._translateService.instant('common.errors-message.get-data-fail')
								);
						}
						
					} else if (result.response.responseStatus === 417) {
						this.presentToast(
							EToastType.warning,
							this._translateService.instant(
								result.response.content.message
							)
						);
					} else {
						this.presentToast(
							EToastType.error,
							this._translateService.instant(
								result.response.content.message
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
				}
			);
	}
	findProduct(
		productId: number,
		productList: ProductDto[]
	): ProductDto | undefined {
		return productList.find((product) => product.productId === productId);
	}
	receiveSearch($event: any, campaignId: number) {
		this.qrHistoryList = $event;
		this.campaignId = campaignId;
	}
}
