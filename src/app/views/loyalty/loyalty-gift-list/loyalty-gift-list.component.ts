import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "@app/services/common/common.service";
import { ValidationUtil } from "@app/utilities/validation.util";
import { BaseComponent } from "@app/views/base.component";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "primeng/dynamicdialog";
import { Gift } from "@app/interfaces/dtos/loyalty.dto";
import { LoyaltyDialogCreateProductComponent } from "../loyalty-dialog-create-product/loyalty-dialog-create-product.component";
import { LoyaltyDialogUpdateProductComponent } from "../loyalty-dialog-update-product/loyalty-dialog-update-product.component";
import { LoyaltyService } from "@app/services/loyalty/loyalty.service";
import { delay } from "rxjs/operators";
import { EToastType } from "@app/constants";
import { ConfirmationService } from "primeng/api";
@Component({
    selector:'app-loyalty-gift-list',
    templateUrl:'./loyalty-gift-list.component.html',
    styleUrls:['./loyalty-gift-list.component.scss']
})
export class LoyaltyGiftListComponent extends BaseComponent{
	listGift!:Gift[];
    constructor(
		public loyaltyService:LoyaltyService,
		public _confirmationService: ConfirmationService,

		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		_validate: ValidationUtil,
		_toast: ToastrService,
		_translateService: TranslateService,
		_dialog: DialogService,
		
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
        this.getMembershipGiftList();
    }
    
    ngOnDestroy(): void {
        
    }

	
	async getMembershipGiftList() {
		this._common.attachSpinner();
		
			this.loyaltyService.getMembershipGift({
				page: 1,
				itemPerPage: "10",
				productId: 0,
			})?.pipe(delay(this.loadingTime))
			.subscribe(
				(result) => {
					if (result.responseStatus === 200) {
						this.listGift = result.content.datas.datasList;

						console.log(result);

						

						// last page 
						
						this.presentToast(
							EToastType.success,
							this._translateService.instant(
								result.content.message
							)
						);
					} else if (result.responseStatus === 417) {
						this.presentToast(
							EToastType.warning,
							this._translateService.instant(
								result.content.message
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

	doDelete(id: string, message?: string) {
		console.log(message)
		this._confirmationService.confirm({
			message: message,
			accept: () => {
				this.loyaltyService.doDelete(id)?.subscribe(
					(result) => {
						if (result.responseStatus === 200) {
							
							this.presentToast(
								EToastType.success,
								this._translateService.instant(result.content.message)
							);
							this.getMembershipGiftList();
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

	checkStatusOfGift(endDate:string, startDate:string):boolean{
		
		const changeStringToDateOfEndDate=new Date(endDate);
		const currentDate = new Date();
		// const changeStringToDateOfStartDate= new Date("2023-02-28T17:00:00.000000Z")
		const timeDistance = currentDate.getTime()-changeStringToDateOfEndDate.getTime()
		const dateDistance=Math.ceil(timeDistance/(1000*3600*24));
		
		return dateDistance>0 ? false : true
	}
	receiveSearch($event: any) {
		console.log("event"+$event);
		this.listGift = $event;
	}

	showModalDialogAdd(){
		// console.log("click button create qrcode");
		const ref = this._dialog.open(LoyaltyDialogCreateProductComponent, {
			header: this._translateService.instant(
				'Thêm Quà Tặng'
			),
			width: '50vw',
		});
		// ref.onClose.subscribe((_) => this.getCustomerList());
	}
	showModalDialogUpdate(giftId:string){
		console.log("click button update qrcode");
		const ref = this._dialog.open(LoyaltyDialogUpdateProductComponent, {
			header: this._translateService.instant(
				'Chỉnh Sửa Quà Tặng'
			),
			width: '50vw',
			data: {
				giftId: giftId,
				
			},
		});
		// ref.onClose.subscribe((_) => this.getCustomerList());
	}
}