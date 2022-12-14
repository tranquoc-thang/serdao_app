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
			"T???nh Kh??nh H??a": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh Ninh Thu???n": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh B??nh Thu???n": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh ?????k L???k": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh ?????k N??ng": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh L??m ?????ng": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh B??nh Ph?????c": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh T??y Ninh": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh B??nh D????ng": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh ?????ng Nai": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh B?? R???a - V??ng T??u": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Th??nh ph??? H??? Ch?? Minh": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh Long An": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh Ti???n Giang": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh B???n Tre": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh Tr?? Vinh": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh V??nh Long": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh ?????ng Th??p": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh An Giang": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh Ki??n Giang": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"Th??nh ph??? C???n Th??": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh S??c Tr??ng": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh B???c Li??u": [
				'',
				{
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
			],
			"T???nh C?? Mau": [
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
