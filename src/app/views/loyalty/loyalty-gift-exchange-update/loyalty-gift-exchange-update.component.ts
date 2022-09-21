import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { CustomerDto } from '@app/interfaces/dtos/customer.dto';
import { Province } from '@app/interfaces/models/province.entity';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
	selector: 'app-loyalty-gift-exchange-update',
	templateUrl: './loyalty-gift-exchange-update.component.html',
	styleUrls: ['./loyalty-gift-exchange-update.component.scss'],
})
export class LoyaltyGiftExchangeUpdateComponent
	extends BaseComponent
	implements OnInit
{
	constructor(
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		_validate: ValidationUtil,
		_toast: ToastrService,
		_dialog: DialogService,
		_translateService: TranslateService,
		private customerService: CustomerService,
		public formBuilder: FormBuilder,
		private _ref: DynamicDialogRef,
		private primeConfig: PrimeNGConfig,
		public config: DynamicDialogConfig,
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

	customerCreateForm!: FormGroup;
	provinceList!: Province[];
	displayModal!: boolean;
	currentProvince!: Province | null;
	isCustomerUpdation: boolean = true;
	isEdit: boolean = false;
	dataGroupId!: number;
	customer!: CustomerDto;
	customerNo!: string;
	customerBirthday!: Date;
	currentGroupId!: number;
	currentProvinceId!: number;
	currentProvinceName!: string;
	fileUndefined!: File;

	ngOnInit(): void {
		this.isEdit = this.config.data.isEdit;
		this.dataGroupId = this.config.data.groupId;
		this.customerNo = this.config.data.customerNo;

		const overlay: HTMLDivElement = document.querySelector('.p-dialog-mask')!;
		overlay.style.pointerEvents = 'unset';

		this._translateService
			.get('primeng')
			.subscribe((res) => this.primeConfig.setTranslation(res));
		this.customerCreateForm = this.formBuilder.group({
			txtPhoneNumber: [
				'',
				{
					validators: [
						Validators.maxLength(150),
						Validators.pattern(
							Environment.validators.patterns.onlyNumeric
						),
					],
					asyncValidators: [],
					updateOn: 'change',
				},
			],

			txtAddress: [
				'',
				{
					validators: [Validators.maxLength(1000)],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
		});
	}

	getProvince($event: any) {
		this.currentProvinceId = $event.value;
		// this.currentProvinceName = $event.value.provinceName;
	}

	getProvinced($event: Province) {
		this.currentProvinceId = $event.provinceId;
		this.currentProvinceName = $event.provinceName;
	}

	isDisable(): boolean {
		return this.customerCreateForm.valid;
	}
}
