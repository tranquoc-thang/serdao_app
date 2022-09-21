import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { ProductDto } from '@app/interfaces/dtos/product.dto';
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

@Component({
  selector: 'app-advance-search-history-list-qrcode',
  templateUrl: './advance-search-history-list-qrcode.component.html',
  styleUrls: ['./advance-search-history-list-qrcode.component.scss']
})
export class AdvanceSearchHistoryListQrcodeComponent extends BaseComponent {
  productList!: ProductDto[];
	selectedProduct!: ProductDto;
	qrcodeForm!: FormGroup;
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
  }

  ngOnInit(): void {
		this.qrcodeForm = this.fb.group({
			qrcodePackingNumber: ['', [Validators.required]],
			qrcodeProduct: ['', [Validators.required]],
			qrcodeDateCreate: ['', [Validators.required]],
		});
		this.initializePage();
	}

	initializePage() {
		this.getPackingList();
	}

	async getPackingList() {
		forkJoin({
			productList: this.qrcodeService.getProductList(),
		})
			.pipe(delay(this.loadingTime))
			.subscribe(
				(result) => {
					if (result.productList.responseStatus === 200) {
						this.productList =
							result.productList.content.datas.producstList;
						this.presentToast(
							EToastType.success,
							this._translateService.instant(
								result.productList.content.message
							)
						);
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

	findPacking(query: {
		qrcodePackingNumber: string;
		qrcodeProduct: string;
		qrcodeDateCreate: string;
	}): void {
		console.log(query);
	}

}
