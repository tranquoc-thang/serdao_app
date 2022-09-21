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

import { ProductDto } from '@app/interfaces/dtos/product.dto';
import { Province } from '@app/interfaces/models/province.entity';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { AddPackingRequest } from '@app/interfaces/dtos/qrcode.dto';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import { Environment } from '@environments/environment';

import { QrCodeService } from '@app/services/qrcode/qrcode.service';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
	selector: 'app-qrcode-dialog-create',
	templateUrl: './qrcode-dialog-create.component.html',
	styleUrls: ['./qrcode-dialog-create.component.scss'],
})
export class QrcodeDialogCreateComponent
	extends BaseComponent
	implements OnInit, OnDestroy
{
	qrcodeFormCreate!: FormGroup;
	productList!: ProductDto[];
	selectedProductId!:number;
	constructor(
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
		public qrcodeService: QrCodeService,

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
	// _dropdownProducts! :DropdownModule;
	
	ngOnInit(): void {
		console.log("turn on qrcode-dialog-create");
		this.qrcodeFormCreate = this.formBuilder.group({
			// qrcodeProductCreate: ['', {
			// 	validators: [
					
			// 		Validators.required,
			// 	],
			// }],
			qrcodeCreateNumberOfProduct: ['', {
				validators: [
					Validators.pattern(
						Environment.validators.patterns.onlyNumeric
					),
					Validators.required,
				],
				asyncValidators: [],
				updateOn: 'change'
			}],
			qrcodeCreateProductionDate: ['', {
				validators: [
					
					Validators.required,
				],
				asyncValidators: [],
				updateOn: 'change'
			}],
			
			
		});
		this.getProductList();
	}
	ngOnDestroy(): void {
		console.log("turn off qrcode-dialog-create");
	}
	async getProductList(){
		forkJoin({
			productList: this.qrcodeService.getProductList(),
		})
			.pipe(delay(this.loadingTime))
			.subscribe(
				(result) => {
					if (result.productList.responseStatus === 200) {
						this.productList =
							result.productList.content.datas.producstList;
						// this.presentToast(
						// 	EToastType.success,
						// 	this._translateService.instant(
						// 		result.productList.content.message
						// 	)
						// );
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

	onCreateNewQrcode() {
		
		const newQrCode:AddPackingRequest = {
			productId:this.selectedProductId,
			quantity:+this.qrcodeFormCreate.value.qrcodeCreateNumberOfProduct,
			packagingDate:this.qrcodeFormCreate.value.qrcodeCreateProductionDate

		};
		console.log(newQrCode);
		const resultAfterCreate=this.qrcodeService.addPacking(newQrCode)?.subscribe(
			(result) => {
				console.log(result)
				if (result.responseStatus === 200) {
					this.presentToast(
						EToastType.success,
						this._translateService.instant(result.content.message)
					);
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
		)
		console.log(resultAfterCreate);
	
	}
	onChangeProductAtSelected($event:any){
		this.selectedProductId=$event.value;
	}
	isDisable(): boolean {
		return this.qrcodeFormCreate.valid;
	}
}
