import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { EToastType } from "@app/constants";
import { CommonService } from "@app/services/common/common.service";
import { LoyaltyService } from "@app/services/loyalty/loyalty.service";
import { ValidationUtil } from "@app/utilities/validation.util";
import { BaseComponent } from "@app/views/base.component";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "primeng/dynamicdialog";
import { delay } from "rxjs/operators";
import { LoyaltyMembership } from "@app/interfaces/dtos/loyalty.dto";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Environment } from "@environments/environment";

@Component({
    selector:'app-loyalty-rule',
    templateUrl:'./loyalty-rule.component.html',
    styleUrls:['./loyalty-rule.component.scss']
})
export class LoyaltyRuleComponent extends BaseComponent{
	public autoResize: boolean = true;
	membershipList!:LoyaltyMembership[];
    constructor(
		public loyaltyService:LoyaltyService,
		private formBuilder: FormBuilder,
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
		this.getMembershipList();

    }
    
    ngOnDestroy(): void {
        
    }
	

	async getMembershipList() {
		this._common.attachSpinner();
		
			this.loyaltyService.getMembershipList()?.pipe(delay(this.loadingTime))
			.subscribe(
				(result) => {
					if (result.responseStatus === 200) {
						this.membershipList = result.content.datas.datasList;

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

	async updateMembership(id:any){
		this._common.attachSpinner();
		const membershipUpdate={
			membershipClass: this.membershipList[id-1].membershipClass,
			membershipPoint: this.membershipList[id-1].membershipPoint,
			membershipDescription: this.membershipList[id-1].membershipDescription,
		}
		this.loyaltyService.updateMembership(id,membershipUpdate)?.pipe(delay(this.loadingTime))
			.subscribe(
				(result)=>{
					if (result.responseStatus===200){
							this.presentToast(
								EToastType.success,
								this._translateService.instant(
									result.content.message
								)
							);
					}else if (result.responseStatus === 417) {
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
				
			)
	}
}