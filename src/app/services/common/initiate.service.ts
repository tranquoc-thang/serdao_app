import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BaseService } from '@app/services/base.service';
import { HttpUtil } from '@app/utilities/http.util';
import { StringUtil } from '@app/utilities/string.util';
import { TranslateService } from '@ngx-translate/core';
import { Environment } from '@environments/environment';
import { RouterService } from '../common.router.service';
import { CommonResponses } from '@app/interfaces/dtos/common-responses.dto';
import { CommonRequests } from '@app/interfaces/dtos/common-requests.dto';
import { UserLoginDto } from '@app/interfaces/dtos/user.dto';
import { Locale } from '@app/constants';

const servereUrl = `${Environment.host}${Environment.endpoint.systemEndpoint.initiateEndpoint}`;

@Injectable({
	providedIn: 'root',
})
export class InitiateService extends BaseService {
	//Initialize Page
	constructor(
		_httpUtil: HttpUtil,
		_stringUtil: StringUtil,
		_translateService: TranslateService
	) {
		super(_httpUtil, _stringUtil, _translateService);
	}

	public getInitiateSystem(lang?: Locale): Observable<CommonResponses> | null {
		try {
			const requestUrl = `${servereUrl}${RouterService.initiate_system}/${lang}`;

			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
