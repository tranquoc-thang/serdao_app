import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
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
import { QrcodeDialogCreateComponent } from '@app/views/qcode/qrcode-dialog-create/qrcode-dialog-create.component'
import { QrcodeDialogDetailComponent } from '@app/views/qcode/qrcode-dialog-detail/qrcode-dialog-detail.component'
@Component({
	selector: 'app-qrcode-list',
	templateUrl: './qrcode-list.component.html',
	styleUrls: ['./qrcode-list.component.scss'],
})
export class QrcodeListComponent extends BaseComponent {
	packingList!: QrPackingDto[];
	productList!: ProductDto[];
	public currentPage: {
		first: number;
		rows: number;
		page: number;
		pageCount: number;
	} = { first: 0, rows: 10, page: 0, pageCount: 10 };
	public totalRecords!: number;
	public pageLinks!: number;
	public lastPage!: number;
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
		public qrcodeService: QrCodeService,
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
		this.getPackingList();
	}

	async getPackingList() {
		this._common.attachSpinner();

		forkJoin({
			response: this.qrcodeService.getPackingList({
				page: this.currentPage.page + 1,
				itemPerPage: "1000",
				productId: 0,
			}),
			productList: this.qrcodeService.getProductList(),
		})
			.pipe(delay(this.loadingTime))
			.subscribe(
				(result) => {
					if (result.response.responseStatus === 200) {
						this.packingList = result.response.content.datas.datasList;

						// console.log(result);

						this.productList =
							result.productList.content.datas.producstList;

						this.totalRecords = result.response.content.datas.totalDatas;
						// console.log("totalRecors: " + this.totalRecords);
						//Number of paging button
						this.pageLinks = Math.round(
							this.totalRecords / this.currentPage.rows + 1
						);

						console.log(result)

						// last page s
						this.lastPage = Math.floor(this.totalRecords / this.currentPage.rows) + 1;
						// console.log(this.lastPage);
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

	findProduct(
		productId: number,
		productList: ProductDto[]
	): ProductDto | undefined {
		return productList.find((product) => product.productId === productId);
	}

	/// error chưa chạy dc
	// onDownloadQr(packingId:any){
	// 	console.log("clickButton Download");
	// 	this._common.attachSpinner();
	// 	this.qrcodeService.downloadPacking(packingId)?.pipe(delay(this.loadingTime))
	// 		.subscribe(
	// 			(result)=>{
	// 				if (result.responseStatus===200){
	// 						console.log(result);
	// 						this.presentToast(
	// 							EToastType.success,
	// 							this._translateService.instant(
	// 								result.content.message
	// 							)
	// 						);
	// 				}else if (result.responseStatus === 417) {
	// 					console.log(result);
	// 					this.presentToast(
	// 						EToastType.warning,
	// 						this._translateService.instant(
	// 							result.content.message
	// 						)
	// 					);
	// 				} else {
	// 					console.log(result);
	// 					this.presentToast(
	// 						EToastType.error,
	// 						this._translateService.instant(
	// 							'common.errors-message.common-server-error'
	// 							// result.response.content.message
	// 						)
	// 					);
	// 				}
	// 				this._common.detachSpinner();
	// 			},
	// 			(error) => {
	// 				console.log(error);
	// 				this.presentToast(
	// 					EToastType.error,
	// 					this._translateService.instant(
	// 						'common.errors-message.common-server-error'
	// 					)
	// 				);

	// 			}

	// 		)
	// }

	doDelete(packingId: string, message?: string) {
		console.log(message)
		this._confirmationService.confirm({
			message: message,
			accept: () => {
				this.qrcodeService.doDelete(packingId)?.subscribe(
					(result) => {
						if (result.responseStatus === 200) {

							this.presentToast(
								EToastType.success,
								this._translateService.instant(result.content.message)
							);
							this.getPackingList();
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



	showModalDialogCreate() {

		const ref = this._dialog.open(QrcodeDialogCreateComponent, {
			header: this._translateService.instant(
				'pages.qrcode.labels.create-dialog-title'
			),
			width: '50vw',
		});
		// ref.onClose.subscribe((_) => this.getCustomerList());
	}
	showModalDialogDetail(packing_id: string) {
		const ref = this._dialog.open(QrcodeDialogDetailComponent, {
			data: {
				packing_id: packing_id,
			},
			header: this._translateService.instant(
				'pages.qrcode.labels.detail-dialog-title'
			),
			width: '60vw',

		});
		// ref.onClose.subscribe((_) => this.getCustomerList());
	}
}
