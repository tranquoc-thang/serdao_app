import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { CampaignProvinces, CampaignProvincesUpdate } from '@app/interfaces/dtos/campaign.dto';
import { Province } from '@app/interfaces/models/province.entity';
import { CampaignService } from '@app/services/campaign/campaign.service';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { QrCodeService } from '@app/services/qrcode/qrcode.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import {
	DialogService,
	DynamicDialogRef,
	DynamicDialogConfig,
} from 'primeng/dynamicdialog';

@Component({
	selector: 'app-province-tab',
	templateUrl: './province-tab.component.html',
	styleUrls: ['./province-tab.component.scss'],
})
export class ProvinceTabComponent extends BaseComponent implements OnInit {
	provinceList!: Province[];
	provinceListS!: Province[];
	provinceListC!: Province[];
	provinceListN!: Province[];
	isCheckSouth: boolean = false;
	isCheckCenter: boolean = false;
	isCheckNorth: boolean = false;
	isCheckS: boolean[] = [];
	isCheckC: boolean[] = [];
	isCheckN: boolean[] = [];
	@Input() currentProvinces!: CampaignProvinces[];
	@Input() campaignId!: number;
	provincesS!: FormGroup;
	provincesSouth: string = 'provincesSouth'

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
		private commonService: CommonService,
		public config: DynamicDialogConfig,
		public campaignService: CampaignService,
		public qrcodeService: QrCodeService
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
		this.commonService.provinceSelection.subscribe((data) => {
			this.provinceList = data;
			this.provinceListS = this.getProvinceSouth(data);
			this.provinceListC = this.getProvinceCennter(data);
			this.provinceListN = this.getProvinceNorth(data);
		});

		this.provincesS = this.formBuilder.group({
			"Tỉnh Khánh Hòa": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Ninh Thuận": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Bình Thuận": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Đắk Lắk": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Đắk Nông": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Lâm Đồng": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Bình Phước": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Tây Ninh": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Bình Dương": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Đồng Nai": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Bà Rịa - Vũng Tàu": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Thành phố Hồ Chí Minh": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Long An": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Tiền Giang": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Bến Tre": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Trà Vinh": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Vĩnh Long": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Đồng Tháp": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh An Giang": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Kiên Giang": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Thành phố Cần Thơ": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Sóc Trăng": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Bạc Liêu": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Tỉnh Cà Mau": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
		})


	}

	handleUpdateProvinces(campaignId: number) {
		const checkboxsList: any = document.querySelectorAll('input#ny')
		const provincesCheckedList: Array<string> = []

		for (let i = 0; i < checkboxsList.length; i++) {

			if (checkboxsList[i].checked === true) {
				provincesCheckedList.push(checkboxsList[i].value)
			}
		}

		const newDataChecked: CampaignProvincesUpdate = {
			provincesList: provincesCheckedList.join(',')
		};


		this.campaignService.updateProvincesCampaing(newDataChecked, campaignId)?.subscribe(
			(result) => {

				if (result.responseStatus === 200) {
					this.presentToast(
						EToastType.success,
						this._translateService.instant(result.content.message)
					)
				} else if (result.responseStatus === 417) {
					this.presentToast(
						EToastType.warning,
						this._translateService.instant(result.content.message)
					)
				} else {
					this.presentToast(
						EToastType.error,
						this._translateService.instant(result.content.message)
					)
				}
			},
			(error) => {
				console.error(error);
				this.presentToast(
					EToastType.error,
					this._translateService.instant(error)
				)
			}
		)

	}

	getProvinceSouth(provinceList: Province[]) {
		let list: Province[] = [];
		for (let province of provinceList) {
			if (province.provinceNameOptional == 'S') {
				list.push(province);
			}
		}

		list.forEach(province => {
			for (let i = 0; i < this.currentProvinces.length; i++) {
				if (this.currentProvinces[i].provinceId === province.provinceId) {
					this.isCheckS.push(true);
					return;
				} else if (i === this.currentProvinces.length - 1) {
					this.isCheckS.push(false);
					return
				}
			}
		})

		// console.log(this.isCheckS)
		return list;
	}
	getProvinceCennter(provinceList: Province[]) {
		let list: Province[] = [];
		for (let province of provinceList) {
			if (province.provinceNameOptional == 'C') {
				list.push(province);
			}
		}

		list.forEach(province => {
			for (let i = 0; i < this.currentProvinces.length; i++) {
				if (this.currentProvinces[i].provinceId === province.provinceId) {
					this.isCheckC.push(true);
					return;
				} else if (i === this.currentProvinces.length - 1) {
					this.isCheckC.push(false);
					return
				}
			}
		})

		// console.log(this.isCheckC)

		return list;
	}
	getProvinceNorth(provinceList: Province[]) {
		let list: Province[] = [];
		for (let province of provinceList) {
			if (province.provinceNameOptional == 'N') {
				list.push(province);
			}
		}

		list.forEach(province => {
			for (let i = 0; i < this.currentProvinces.length; i++) {
				if (this.currentProvinces[i].provinceId === province.provinceId) {
					this.isCheckN.push(true);
					return;
				} else if (i === this.currentProvinces.length - 1) {
					this.isCheckN.push(false);
					return
				}
			}
		})

		// console.log(this.isCheckN)

		return list;
	}

	selectAllNorth() {
		if (this.isCheckNorth == false) {
			for (let i = 0; i < this.isCheckN.length; i++) {
				this.isCheckN[i] = false;
			}
		} else {
			for (let i = 0; i < this.isCheckN.length; i++) {
				this.isCheckN[i] = true;
			}
		}
	}

	selectAllCenter() {
		if (this.isCheckCenter == false) {
			for (let i = 0; i < this.isCheckC.length; i++) {
				this.isCheckC[i] = false;
			}
		} else {
			for (let i = 0; i < this.isCheckC.length; i++) {
				this.isCheckC[i] = true;
			}
		}
	}

	selectAllSouth() {
		if (this.isCheckSouth == false) {
			for (let i = 0; i < this.isCheckS.length; i++) {
				this.isCheckS[i] = false;
			}
		} else {
			for (let i = 0; i < this.isCheckS.length; i++) {
				this.isCheckS[i] = true;
			}
		}
	}

	logAll() {
		console.log(this.isCheckC);
		console.log(this.isCheckN);
		console.log(this.isCheckS);
	}

}
