import { QrcodeSearch } from './../../interfaces/dtos/qrcode.dto';
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
import {
	AddPackingRequest,
	GetPackingRequest,
	QrPackingDto,
} from '@app/interfaces/dtos/qrcode.dto';

const servereUrl = `${Environment.host}${Environment.endpoint.systemEndpoint.qrcodeEndpoint}`;
const servereUrlCampaign = `${Environment.host}${Environment.endpoint.systemEndpoint.campaignEndpoint}`;
@Injectable({
	providedIn: 'root',
})
export class QrCodeService extends BaseService {
	constructor(
		_httpUtil: HttpUtil,
		_stringUtil: StringUtil,
		_translateService: TranslateService
	) {
		super(_httpUtil, _stringUtil, _translateService);
	}

	packingList!: QrPackingDto[];

	getPackingList(body: GetPackingRequest): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.qrcode_packing_list}`;
			
			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	addPacking(body: AddPackingRequest): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.qrcode_create}`;

			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	downloadPacking(packingId:any): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.qrcode_download}/${packingId}`;
			
			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.error(error);
			return null;
		}
	}


	getPackingListDetail(
		id: number,
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.qrcode_detail}/${id}`;

			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	onClickDeactiveButton(
		id: number,
	): Observable<CommonResponses> | null {
		try {
			
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.qrcode_deactive}/${id}`;
			console.log(requestUrl);
			return this._httpUtil.doPatch(requestUrl,null);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	onClickActiveButton(
		id: number,
	): Observable<CommonResponses> | null {
		try {
			
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.qrcode_active}/${id}`;
			console.log(requestUrl);
			return this._httpUtil.doPatch(requestUrl,null);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	doDelete(id: String): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.qrcode_delete}/${id}`;

			return this._httpUtil.doDelete(requestUrl);
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	advancedSearch(
		searchQrCode: QrcodeSearch
	, campaignId:number): Observable<CommonResponses> | null {
		try {
			let endpoint = servereUrlCampaign;
			let requestUrl = `${endpoint}${RouterService.campaign_search_qr_code}/${campaignId}`;
			console.log('search qrcode', searchQrCode);

			return this._httpUtil.doPost(requestUrl, searchQrCode);
		} catch (error) {
			return null;
		}
	}
}
