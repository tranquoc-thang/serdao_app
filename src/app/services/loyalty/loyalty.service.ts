import { Injectable } from '@angular/core';
import { CommonRequests } from '@app/interfaces/dtos/common-requests.dto';
import { CommonResponses } from '@app/interfaces/dtos/common-responses.dto';
import { HttpUtil } from '@app/utilities/http.util';
import { StringUtil } from '@app/utilities/string.util';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { BaseService } from '../base.service';
import { RouterService } from '../common.router.service';

import { StorageUtil } from '@app/utilities/storage.util';
import { Province } from '@app/interfaces/models/province.entity';
import { CustomerCreateDto } from '@app/interfaces/dtos/customer.dto';
// import {
// 	AddPackingRequest,
// 	GetPackingRequest,
// 	QrPackingDto,
// } from '@app/interfaces/dtos/Loyalty.dto';
import { AddGiftRequest, GetPackingRequest, Gift } from '@app/interfaces/dtos/loyalty.dto';
import { QrcodeSearch } from '@app/interfaces/dtos/qrcode.dto';
const servereUrl = `${Environment.host}${Environment.endpoint.systemEndpoint.membershipGiftEndpoint}`;
const servereUrlQr = `${Environment.host}${Environment.endpoint.systemEndpoint.membershipEndpoint}`;
@Injectable({
	providedIn: 'root',
})
export class LoyaltyService extends BaseService {
	constructor(
		_httpUtil: HttpUtil,
		_stringUtil: StringUtil,
		_translateService: TranslateService
	) {
		super(_httpUtil, _stringUtil, _translateService);
	}

	membershipGiftList!: Gift[];

	getMembershipGift(body: any): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.loyalty_membership_gift_list}`;
			console.log("requestUrl",requestUrl)
			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}



	getMembershipGiftDetail(
		id: string,
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.loyalty_membership_gift_detail}/${id}`;
			console.log(requestUrl)
			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	getMembershipList(
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl =  `${Environment.host}${Environment.endpoint.systemEndpoint.membershipEndpoint}`;
			let requestUrl = `${endpointUrl}${RouterService.member_list}`;
			console.log(requestUrl)
			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	updateMembership(
		id: number,
		body:any,
	): Observable<CommonResponses> | null {
		try {
			
			let endpointUrl = `${Environment.host}${Environment.endpoint.systemEndpoint.membershipEndpoint}`;
			let requestUrl = `${endpointUrl}${RouterService.loyalty_membership_update}/${id}`;
			console.log(requestUrl);
			return this._httpUtil.doPatch(requestUrl,body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	addMembershipGift(data: FormData): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.loyalty_membership_gift_add}`;
			
			return this._httpUtil.doUpload(requestUrl, data);
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	updateMembershipGift(data: FormData,slug: string): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.loyalty_membership_gift_update}/${slug}`;
			
			return this._httpUtil.doUpload(requestUrl, data);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	doDelete(id: String): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.loyalty_membership_gift_delete}/${id}`;

			return this._httpUtil.doDelete(requestUrl);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	advancedSearch(
		searchMembershipGift: any
	): Observable<CommonResponses> | null {
		try {
			let endpoint = servereUrl;
			let requestUrl = `${endpoint}${RouterService.loyalty_membership_gift_search}`;
			console.log('search campaign', searchMembershipGift);

			return this._httpUtil.doPost(requestUrl, searchMembershipGift);
		} catch (error) {
			return null;
		}
	}
	getQrHistoryList(body: GetPackingRequest): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrlQr;
			let requestUrl = `${endpointUrl}${RouterService.campaign_qrcode_history}`;
			console.log("sss" + requestUrl)
			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	advancedSearchQrHistory(
		searchQrCode: QrcodeSearch
	): Observable<CommonResponses> | null {
		try {
			let endpoint = servereUrlQr;
			let requestUrl = `${endpoint}${RouterService.campaign_search_qr_code}`;
			console.log('search qrcode', searchQrCode);
			return this._httpUtil.doPost(requestUrl, searchQrCode);
		} catch (error) {
			return null;
		}
	}
}
