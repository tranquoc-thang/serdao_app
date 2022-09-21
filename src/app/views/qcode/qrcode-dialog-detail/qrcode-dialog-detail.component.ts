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
import { Province } from '@app/interfaces/models/province.entity';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { QrCodeService } from '@app/services/qrcode/qrcode.service';

import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { debug } from 'console';
import { ToastrService } from 'ngx-toastr';
import {DropdownModule} from 'primeng/dropdown';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { delay } from 'rxjs/operators';


@Component({
	selector: 'app-qrcode-dialog-detail',
	templateUrl: './qrcode-dialog-detail.component.html',
	styleUrls: ['./qrcode-dialog-detail.component.scss'],
})
export class QrcodeDialogDetailComponent
	extends BaseComponent
	implements OnInit, OnDestroy
{
	qrcodeDetail:any;
	constructor(
		public config: DynamicDialogConfig,
		public qrcodeService: QrCodeService,
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
		console.log(this.config.data.packing_id);
		this.getQrcodeDetail(this.config.data.packing_id);
	}
	ngOnDestroy(): void {
		console.log("turn off qrcode-dialog-delete");
	}

	async getQrcodeDetail(packing_id: any){
		
		this._common.attachSpinner();
		this.qrcodeService.getPackingListDetail(packing_id)?.pipe(delay(this.loadingTime))
			.subscribe(
				(result)=>{
					if (result.responseStatus===200){
							this.qrcodeDetail=result.content.datas
							console.log(this.qrcodeDetail);
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


	async onClickDeactiveButton(qrCode: any){
		console.log("click Deactive button");
		this._common.attachSpinner();
		this.qrcodeService.onClickDeactiveButton(qrCode)?.pipe(delay(this.loadingTime))
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

	async onClickActiveButton(qrCode: any){
		
		this._common.attachSpinner();
		this.qrcodeService.onClickActiveButton(qrCode)?.pipe(delay(this.loadingTime))
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
