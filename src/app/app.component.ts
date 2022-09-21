import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { StorageUtil } from '@app/utilities/storage.util';

import { GlobalProvider } from './providers/global.provider';

import { TranslateService } from '@ngx-translate/core';

import { InitiateService } from './services/common/initiate.service';
import { EToastType, Locale } from './constants/settings.constants';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { Router, RouterModule } from '@angular/router';

@Component({
	selector: 'app-root',
	template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, OnDestroy {
	private unsubscribe: Subscription[] = [];

	constructor(
		private toastr: ToastrService,
		public _translateService: TranslateService,
		private initiateService: InitiateService,
		private _router: Router
	) {
		if (StorageUtil.checkExistKey('adminInfo')) {
			GlobalProvider.adminInfo = StorageUtil.getValue('adminInfo');
		}
	}

	ngOnInit(): void {
		this.initializeApp();
		this.initTranslate();
	}

	ngOnDestroy() {
		this.unsubscribe.forEach((sb) => sb.unsubscribe());
	}

	private async initializeApp() {
		// await this.initiateService.getInitiateSystem(Locale.japanse)?.subscribe(
		// 	(result) => {
		// 		if (result.responseStatus === 200) {
		// 			StorageUtil.storeValue(
		// 				'provincesList',
		// 				result.content.datas.provincesList
		// 			);
		// 			StorageUtil.storeValue(
		// 				'citiesList',
		// 				result.content.datas.citiesList
		// 			);
		// 			StorageUtil.storeValue(
		// 				'careersList',
		// 				result.content.datas.careersList
		// 			);
		// 			StorageUtil.storeValue(
		// 				'typeOfBunsinessList',
		// 				result.content.datas.typeOfBunsinessList
		// 			);
		// 			StorageUtil.storeValue(
		// 				'areasList',
		// 				result.content.datas.areasList
		// 			);
		// 			StorageUtil.storeValue(
		// 				'majorsList',
		// 				result.content.datas.majorsList
		// 			);
		// 		} else {
		// 			console.log(result);
		// 		}
		// 	},
		// 	(error) => {
		// 		console.log(error);
		// 	}
		// );
	}

	private async initTranslate() {
		// Set the default language for translation strings, and the current language.
		this._translateService.setDefaultLang('vi');
		this._translateService.use('vi');

		//  if (this.translateService.getBrowserLang() !== undefined)
		//  {
		//      this.translateService.use(this.translateService.getBrowserLang());
		//  }
		//  else
		//  {
		//      this.translateService.use('en'); // Set your language here
		//  }
	}
}
