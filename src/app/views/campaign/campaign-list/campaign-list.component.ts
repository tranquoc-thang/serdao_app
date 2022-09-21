import { CampaignService } from './../../../services/campaign/campaign.service';
import {
	CampaignCreateDto,
	CampaignDto,
} from './../../../interfaces/dtos/campaign.dto';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { ProductDto } from '@app/interfaces/dtos/product.dto';
import { QrPackingDto } from '@app/interfaces/dtos/qrcode.dto';
import { CommonService } from '@app/services/common/common.service';
import { QrCodeService } from '@app/services/qrcode/qrcode.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DialogAddCampaignComponent } from '../dialog-add-campaign/dialog-add-campaign.component';
import { DialogEditCampaignComponent } from '../dialog-edit-campaign/dialog-edit-campaign.component';
import { DialogEditCampaignV1Component } from '../dialog-edit-campaign-v1/dialog-edit-campaign-v1.component';
import { DialogEditCampaign3Component } from '../dialog-edit-campaign3/dialog-edit-campaign3.component';
import { ColumnsTableDto } from '@app/interfaces/dtos/columns-table.dto';

@Component({
	selector: 'app-campaign-list',
	templateUrl: './campaign-list.component.html',
	styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent extends BaseComponent {
	campaignList!: CampaignDto[];
	@Input() cols!: ColumnsTableDto[];
	@Input() groupCols!: ColumnsTableDto[];
	public totalRecords!: number;
	loading: boolean = true;
	public currentPage: {
		first: number;
		rows: number;
		page: number;
		pageCount: number;
	} = { first: 0, rows: 10, page: 0, pageCount: 10 };
	public pageLinks!: number;
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
		public campaignService: CampaignService,
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
			this._translateService.instant('pages.qrcode.labels.page-title')
		);
	}

	ngOnInit(): void {
		this.initializePage();
	}

	initializePage() {
		this.cols = [
			{
				field: 'campaignStatus',
				header: this._translateService.instant(
					'pages.campaign.labels.status'
				),
				type: 'campaignStatus',
			},
		];
		this.groupCols = [
			{
				field: 'campaignGroupId',
				header: this._translateService.instant(
					'pages.campaign.labels.campaign-group'
				),
				type: 'campaignGroupId',
			},
		];
		this.getCampaignList(1, 10);
	}
	async getCampaignList(page: number, row: number) {
		this._common.attachSpinner();
		forkJoin({
			response: this.campaignService.getCampaignList({
				page: page,
				itemPerPage: row.toString(),
				productId: 0,
			}),
		})
			.pipe(delay(this.loadingTime))
			.subscribe(
				(result) => {
					if (result.response.responseStatus === 200) {
						this.campaignList = result.response.content.datas.datasList;
						this.totalRecords = result.response.content.datas.totalDatas;
						this.pageLinks = Math.round(
							this.totalRecords / this.currentPage.rows + 1
						);
						console.log(this.totalRecords);
						this.loading = false;
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
								'common.errors-message.common-server-error'
								// result.response.content.message
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

	showModalDialogCreate() {
		const ref = this._dialog.open(DialogAddCampaignComponent, {
			header: 'Thêm Chiến Dịch',
			width: '50vw',
		});
		ref.onClose.subscribe((_) => this.getCampaignList(1, 10));
	}
	showModalDialogEdit(campaignID: number, campaignType: number) {
		if (campaignType === 1) {
			const ref = this._dialog.open(DialogEditCampaignV1Component, {
				header: 'Chỉnh Sửa Chiến Dịch',
				width: '95%',
				// showHeader: false,
				data: {
					isEdit: true,
					campaignID: campaignID,
					campaignType: campaignType,
				},
			});
			ref.onClose.subscribe((_) => this.getCampaignList(1, 10));
		}
		if (campaignType == 2) {
			const ref = this._dialog.open(DialogEditCampaignComponent, {
				header: 'Chỉnh Sửa Chiến Dịch',
				width: '95%',
				// showHeader: false,
				data: {
					isEdit: true,
					campaignID: campaignID,
					campaignType: campaignType,
				},
			});
			ref.onClose.subscribe((_) => this.getCampaignList(1, 10));
		}

		if (campaignType == 3) {
			const ref = this._dialog.open(DialogEditCampaign3Component, {
				header: 'Chỉnh Sửa Chiến Dịch',
				width: '95%',
				// showHeader: false,
				data: {
					isEdit: true,
					campaignID: campaignID,
					campaignType: campaignType,
				},
			});
			ref.onClose.subscribe((_) => this.getCampaignList(1, 10));
		}
	}

	receiveSearch($event: any) {
		this.campaignList = $event;
	}
	doDelete(campaignId: number, message?: string) {
		this._confirmationService.confirm({
			message: message,
			accept: () => {
				console.log(campaignId);
				this.campaignService.doDeleteCampaign(campaignId)?.subscribe(
					(result) => {
						if (result.responseStatus === 200) {
							this.presentToast(
								EToastType.success,
								this._translateService.instant(result.content.message)
							);
						} else if (result.responseStatus == 417) {
							this.presentToast(
								EToastType.warning,
								this._translateService.instant(
									result.statusText as string
								)
							);
						} else {
							this.presentToast(
								EToastType.error,
								this._translateService.instant(
									result.statusText as string
								)
							);
						}
					},
					(error) => {
						this.presentToast(
							EToastType.error,
							this._translateService.instant(error)
						);
					}
				);
			},
		});
	}

	paginate(event: any) {
		console.log(event);
		this.getCampaignList(event.page + 1, event.rows);
	}
}
