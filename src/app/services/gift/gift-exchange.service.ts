import { Injectable } from '@angular/core';
import { CommonRequests } from '@app/interfaces/dtos/common-requests.dto';
import { CommonResponses } from '@app/interfaces/dtos/common-responses.dto';
import { CustomerRequestingUpdationSearch } from '@app/interfaces/dtos/customer.dto';
import { GiftExchangeSearch } from '@app/interfaces/dtos/exchange-gift.dto';
import { HttpUtil } from '@app/utilities/http.util';
import { StringUtil } from '@app/utilities/string.util';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { RouterService } from '../common.router.service';

const servereUrl = `${Environment.host}${Environment.endpoint.systemEndpoint.exchangeGiftEndpoint}`;

@Injectable({
	providedIn: 'root',
})
export class GiftExchangeService extends BaseService {
	constructor(
		_httpUtil: HttpUtil,
		_stringUtil: StringUtil,
		_translateService: TranslateService
	) {
		super(_httpUtil, _stringUtil, _translateService);
	}

	getListExchangeGift(
		body: CommonRequests
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.exchange_gift_list}`;

			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	advancedSearchGiftExchange(
		searchGiftExchange: GiftExchangeSearch
	): Observable<CommonResponses> | null {
		try {
			let endpoint = servereUrl;
			let requestUrl = `${endpoint}${RouterService.loyalty_membership_gift_list}`;
			console.log('searchGiftExchange', searchGiftExchange);

			return this._httpUtil.doPost(requestUrl, searchGiftExchange);
		} catch (error) {
			return null;
		}
	}
}
