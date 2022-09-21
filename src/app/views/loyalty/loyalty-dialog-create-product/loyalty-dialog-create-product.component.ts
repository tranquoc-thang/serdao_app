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
import { AddGiftRequest } from '@app/interfaces/dtos/loyalty.dto';
import { Province } from '@app/interfaces/models/province.entity';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { LoyaltyService } from '@app/services/loyalty/loyalty.service';

import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { timeStamp } from 'console';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
    selector:'app-loyalty-dialog-create-product',
    templateUrl:'./loyalty-dialog-create-product.component.html',
    styleUrls:['./loyalty-dialog-create-product.component.scss']
})
export class LoyaltyDialogCreateProductComponent extends BaseComponent{
	public autoResize: boolean = true;
	giftFormCreate!: FormGroup;
	currentThumbnailFile!:File;
	currentIconFile!:File;
	currentBannerFile!:File;
	fileUndefined!:File;



    constructor(
		public loyaltyService: LoyaltyService,
		private formBuilder: FormBuilder,
		private _ref: DynamicDialogRef,
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
        
		this.giftFormCreate = this.formBuilder.group({
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

	onCreateNewMembershipGift() {
		

		let formData = new FormData();
		formData.append(
			'giftThumbnail',
			this.currentThumbnailFile,
		);
		formData.append(
			'giftIcon',
			this.currentIconFile,
		)
		formData.append(
			'giftBanner',
			this.currentBannerFile,
		)
		formData.append('giftStartDate', this.giftFormCreate.value.loyaltyGiftExchangeDateStart);
		formData.append('giftEndDate', this.giftFormCreate.value.loyaltyGiftExchangeDateEnd);
		formData.append('giftLimitedQuanlity', this.giftFormCreate.value.loyaltyGiftLimitQuantity);
		formData.append('giftRequiredPoint', this.giftFormCreate.value.loyaltyGiftRequirePoint);
		formData.append('giftTitle', this.giftFormCreate.value.loyaltyGiftName);
		formData.append('giftDescription', this.giftFormCreate.value.loyaltyGiftDescription);

		const resultAfterCreate=this.loyaltyService.addMembershipGift(formData)?.subscribe(
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
		console.log(resultAfterCreate);
	
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