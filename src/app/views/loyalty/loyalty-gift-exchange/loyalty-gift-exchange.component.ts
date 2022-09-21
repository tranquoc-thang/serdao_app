import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { ColumnsTableDto } from '@app/interfaces/dtos/columns-table.dto';
import { ExchangeGiftResponse } from '@app/interfaces/dtos/exchange-gift.dto';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { GiftExchangeService } from '@app/services/gift/gift-exchange.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoyaltyGiftExchangeUpdateComponent } from '../loyalty-gift-exchange-update/loyalty-gift-exchange-update.component';

@Component({
	selector: 'app-loyalty-gift-exchange',
	templateUrl: './loyalty-gift-exchange.component.html',
	styleUrls: ['./loyalty-gift-exchange.component.scss'],
})
export class LoyaltyGiftExchangeComponent
	extends BaseComponent
	implements OnInit
{
	public exchangeGiftInitialized: boolean = false;
	public giftExchangeList!: ExchangeGiftResponse[];
	public currentPage: {
		first: number;
		rows: number;
		page: number;
		pageCount: number;
	} = { first: 0, rows: 10, page: 0, pageCount: 10 };
	public totalRecords!: number;
	public pageLinks!: number;
	@Input() cols!: ColumnsTableDto[];

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
		public dialog: MatDialog,
		public exchangeGiftService: GiftExchangeService,
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
		this._pageTitle.setTitle(
			this._translateService.instant('pages.customer.labels.page-title')
		);
	}

	ngOnInit(): void {
		this.initializePage();
	}

	initializePage() {
		this.cols = [
			{
				field: 'status',
				header: this._translateService.instant(
					'pages.customer.labels.status'
				),
				type: 'exchange_status',
			},
		];
		this.getExchangeGiftList();
	}

	async getExchangeGiftList() {
		this._common.attachSpinner();
		forkJoin({
			response: this.exchangeGiftService.getListExchangeGift({
				page: this.currentPage.page + 1,
				perPage: this.currentPage.rows,
				sort: {
					filedName: '',
					sortType: 'asc|desc',
				},
			}),
			exchangeGiftInitialized: of(true),
		})
			.pipe(delay(this.loadingTime))
			.subscribe(
				(result) => {
					if (result.response.responseStatus === 200) {
						this.giftExchangeList =
							result.response.content.datas.datasList;

						//Total record
						this.totalRecords = result.response.content.datas.totalDatas;

						//Number of paging button
						this.pageLinks = Math.round(
							this.totalRecords / this.currentPage.rows + 1
						);

						this.presentToast(
							EToastType.success,
							this._translateService.instant(
								result.response.content.message
							)
						);
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

	openGiftExchange() {
		const ref = this._dialog.open(LoyaltyGiftExchangeUpdateComponent, {
			header: 'Sửa Thông Tin Nhận Quà',
			width: '45vw',
		});
	}

	receiveSearch($event: any) {
		this.giftExchangeList = $event;
	}
}
