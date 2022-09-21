import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
	FormControl,
	FormGroup,
	NgForm,
	Validators,
	FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import {
	CompanyDto,
	CompanyGetDetailDto,
	CompanyUpdateDto,
} from '@app/interfaces/dtos/company.dto';
import { Gift } from '@app/interfaces/dtos/loyalty.dto';
import { Province } from '@app/interfaces/models/province.entity';
import { CommonService } from '@app/services/common/common.service';
import { LoyaltyService } from '@app/services/loyalty/loyalty.service';

import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { timeStamp } from 'console';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector:'app-loyalty-dialog-update-product',
    templateUrl:'./loyalty-dialog-update-product.component.html',
    styleUrls:['./loyalty-dialog-update-product.component.scss']
})
export class LoyaltyDialogUpdateProductComponent extends BaseComponent{
	public autoResize: boolean = true;
	giftFormUpdate!: FormGroup;
	currentThumbnailFile!:File;
	currentIconFile!:File;
	currentBannerFile!:File;
	membershipGiftThumbnailImg!:File;
	membershipGiftIconImg!:File;
	membershipGiftBannerImg!:File;
	fileUndefined!:File;
	membershipGift!:Gift;
	membershipGiftId!:string;
	giftStartDate!:Date;
	giftEndDate!:Date;

    constructor(
		public loyaltyService: LoyaltyService,
		private formBuilder: FormBuilder,
		private _ref: DynamicDialogRef,
		public config: DynamicDialogConfig,

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

		
	}
    ngOnInit(): void {
		this.membershipGiftId = this.config.data.giftId;
		this.doGetMembershipGiftDetail(this.membershipGiftId).then((result) => {
			// this.customerImgFront = new File([new Blob()], result.customerIdentificationFront, {
			// 	type: 'image/png',
			// });
			
			this.membershipGiftThumbnailImg = result.giftThumbnail
			this.membershipGiftIconImg = result.giftIcon
			this.membershipGiftBannerImg = result.giftBanner
			// this.customerImgBack = new File([new Blob()], result.customerIdentificationBack, {
			// 	type: 'image/png',
			// })
			this.membershipGift = result
			
		})

		this.giftFormUpdate = this.formBuilder.group({
			loyaltyGiftExchangeDateStart: ['', {
				validators: [
					Validators.required,
				],
				asyncValidators: [],
				updateOn: 'change'
			}],
			loyaltyGiftExchangeDateEnd: ['', {
				validators: [
					Validators.required,
				],
				asyncValidators: [],
				updateOn: 'change'
			}],
			loyaltyGiftLimitQuantity: ['', {
				validators: [
					Validators.pattern(
						Environment.validators.patterns.onlyNumeric
					),
					Validators.required,
				],
				asyncValidators: [],
				updateOn: 'change'
			}],
			loyaltyGiftRequirePoint: ['', {
				validators: [
					Validators.pattern(
						Environment.validators.patterns.onlyNumeric
					),
					Validators.required,
				],
				asyncValidators: [],
				updateOn: 'change'
			}],
			loyaltyGiftName: ['', {
				validators: [
					
					Validators.required,
				],
				asyncValidators: [],
				updateOn: 'change'
			}],
			loyaltyGiftDescription: ['', {
				validators: [
					
					Validators.required,
				],
				asyncValidators: [],
				updateOn: 'change'
			}],
			
			
		});
        
    }
    
    ngOnDestroy(): void {
        
    }

	doGetMembershipGiftDetail(slug: string): Promise<any> {
		return new Promise((resolve, rejects) => {
			this.loyaltyService.getMembershipGiftDetail(slug)?.subscribe(
				(result): any => {
					if (result.responseStatus === 200) {
						this.presentToast(
							EToastType.success,
							this._translateService.instant(result.content.message)
						);
						this.membershipGift = result.content.datas.giftDetail;
						this.giftStartDate =  new Date(this.membershipGift.giftStartDate);
						this.giftEndDate =  new Date(this.membershipGift.giftEndDate);
						this.checkIfImageExists(
							this.membershipGift.giftThumbnail
						);
						this.checkIfImageExists(
							this.membershipGift.giftBanner
						);
						this.checkIfImageExists(
							this.membershipGift.giftIcon
						);

						
						resolve(result.content.datas.giftDetail);
					} else if (result.responseStatus === 417) {
						this.presentToast(
							EToastType.warning,
							this._translateService.instant(result.content.message)
						);
						rejects("Something Wrong");
					} else {
						console.log(result);
						this.presentToast(
							EToastType.error,
							this._translateService.instant(
								'common.errors-message.common-server-error'
							)
						);

						rejects("Something Wrong");
					}
					rejects("Something Wrong");
				},
				(error) => {
					console.log(error);
					this.presentToast(
						EToastType.error,
						this._translateService.instant(
							'common.errors-message.common-server-error'
						)
					);

					rejects("Something Wrong");
				}
			);
		});
	}

	onUpdateMembershipGift() {
		

		let formData = new FormData();
		formData.append(
			'giftThumbnail',
			this.currentThumbnailFile || this.membershipGiftThumbnailImg,
		);
		formData.append(
			'giftIcon',
			this.currentIconFile || this.membershipGiftIconImg,
		)
		formData.append(
			'giftBanner',
			this.currentBannerFile || this.membershipGiftBannerImg,
		)
		formData.append('giftStartDate', this.giftFormUpdate.value.loyaltyGiftExchangeDateStart);
		formData.append('giftEndDate', this.giftFormUpdate.value.loyaltyGiftExchangeDateEnd);
		formData.append('giftLimitedQuanlity', this.giftFormUpdate.value.loyaltyGiftLimitQuantity);
		formData.append('giftRequiredPoint', this.giftFormUpdate.value.loyaltyGiftRequirePoint);
		formData.append('giftTitle', this.giftFormUpdate.value.loyaltyGiftName);
		formData.append('giftDescription', this.giftFormUpdate.value.loyaltyGiftDescription);

		const resultAfterUpdate=this.loyaltyService.updateMembershipGift(formData,this.membershipGiftId)?.subscribe(
			(res:any) => {
				
				if (res.type === HttpEventType.UploadProgress) {
					//add progress bar
					// this.progress = Math.round(100 * event.loaded / event.total);
				} else if (res instanceof HttpResponse) {
					let result = res.body;
					console.log(result)
					if (result.responseStatus === 200) {
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
						console.log(result);
						this.presentToast(
							EToastType.error,
							this._translateService.instant(
								'common.errors-message.common-server-error'
							)
						);
					}
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
		)
		console.log(resultAfterUpdate);
	
	}

	handleShowThumbnail($event: any) {
		this.currentThumbnailFile = this.membershipGiftThumbnailImg;
	}
	handleShowIcon($event: any) {
		this.currentIconFile = this.membershipGiftIconImg;
	}
	handleShowBanner($event: any) {
		this.currentBannerFile = this.membershipGiftBannerImg;
	}

	onSelectThumbnail($event: any) {
		// this.currentFileFront = $event.currentFiles[0];
		let selectedFiles: FileList = $event.files;
		this.currentThumbnailFile = selectedFiles[0];
		console.log(this.currentThumbnailFile)
	}
	onSelectIcon($event: any) {
		// this.currentFileFront = $event.currentFiles[0];
		let selectedFiles: FileList = $event.files;
		this.currentIconFile = selectedFiles[0];
		console.log(this.currentThumbnailFile)
	}
	onSelectBanner($event: any) {
		// this.currentFileFront = $event.currentFiles[0];
		let selectedFiles: FileList = $event.files;
		this.currentBannerFile = selectedFiles[0];
		console.log(this.currentThumbnailFile)
	}

	onRemoveThumbnail($event: any) {
		this.currentThumbnailFile = this.fileUndefined;
		console.log(this.currentThumbnailFile);
	}
	onRemoveIcon($event: any) {
		this.currentIconFile = this.fileUndefined;
		console.log(this.currentIconFile);
	}
	onRemoveBanner($event: any) {
		this.currentBannerFile = this.fileUndefined;
		console.log(this.currentBannerFile);
	}

	
}