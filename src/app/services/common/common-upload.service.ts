//Import System Library
import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Environment } from '@environments/environment';

import {
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivate,
	Router,
} from '@angular/router';
//import services
import { TranslateService } from '@ngx-translate/core';
import { RouterService } from '@app/services/common.router.service';
import { BaseService } from '../base.service';
//import utilities
import { HttpUtil } from '@utilities/http.util';
import { StringUtil } from '@utilities/string.util';

const servereUrl = `${Environment.host}${Environment.endpoint.commonmicroservice.commonapi}`;
@Injectable({
	providedIn: 'root',
})
export class CommonUploadService extends BaseService {
	//Initialize Page
	constructor(
		_httpUtil: HttpUtil,
		_stringUtil: StringUtil,
		_translateService: TranslateService
	) {
		super(_httpUtil, _stringUtil, _translateService);
	}

	/**
	 * Upload single image
	 * @author: Vinh Nguyen
	 * @namespace Service
	 * @method: Get
	 * @param userInfo
	 * @return application/json
	 */
	public doUploadSingleImage(formData: FormData) {
		try {
			let requestUrl = `${servereUrl}${RouterService.upload_files}`;

			return this._httpUtil.doUpload(requestUrl, formData);
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
