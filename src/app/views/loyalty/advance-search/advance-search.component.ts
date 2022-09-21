import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { ProductDto } from '@app/interfaces/dtos/product.dto';
import { CommonService } from '@app/services/common/common.service';
import { LoyaltyService } from '@app/services/loyalty/loyalty.service';
import { QrCodeService } from '@app/services/qrcode/qrcode.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'app-advance-search',
	templateUrl: './advance-search.component.html',
	styleUrls: ['./advance-search.component.scss'],
})
export class AdvanceSearchComponent extends BaseComponent {

	selectedProduct!: ProductDto;
	loyaltyMembershipGiftSearchForm!: FormGroup;
	currentPages!:number;
	itemPage!:number;
	
	@Input() isMembershipGiftList: boolean = true;

	@Output() searchEvent = new EventEmitter<any>();
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
		public loyaltyService: LoyaltyService,
		private _ref: DynamicDialogRef,
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
	}

	ngOnInit(): void {
		this.loyaltyMembershipGiftSearchForm = this.fb.group({
			giftTitle: [
				'',
				{
					validators: [
						Validators.maxLength(50),
					],
					asyncValidators: [
						// this._validate.emailExistingValidator('cd', 'cm', true),
					],
					updateOn: 'change',
				},
			],
			giftStartDate: ['', {
				validators: [
					
				],
				asyncValidators: [],
				updateOn: 'change'
			}],
			giftEndDate: ['', {
				validators: [
					
				],
				asyncValidators: [],
				updateOn: 'change'
			}],
		
		});
		this.initializePage();
	}

	initializePage() {

	}


	searchLoyaltyMembershipGift(){
		const searchData: any={
			// page:this.currentPages,
			// itemPerPage: this.itemPage,
			giftTitle: this.loyaltyMembershipGiftSearchForm.value.giftTitle,
			redeemStartDate: this.loyaltyMembershipGiftSearchForm.value.giftStartDate,
			redeemEndDate: this.loyaltyMembershipGiftSearchForm.value.giftEndDate,
		}
		console.log(searchData);
		if (this.isMembershipGiftList) {
					this.loyaltyService.advancedSearch(searchData)?.subscribe(
						(result) => {
							if (result.responseStatus === 200) {
								this.presentToast(
									EToastType.success,
									this._translateService.instant(result.content.message)
								);
								this.searchEvent.emit(result.content.datas.datasList);
								console.log(result.content.datas.datasList);
								// this._ref.close();
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
					this.loyaltyService.advancedSearch(searchData)?.subscribe(
						(result) => {
							if (result.responseStatus === 200) {
								this.presentToast(
									EToastType.success,
									this._translateService.instant(result.content.message)
								);
								this.searchEvent.emit(result.content.datas.datasList);
								// this._ref.close();
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

	
}
