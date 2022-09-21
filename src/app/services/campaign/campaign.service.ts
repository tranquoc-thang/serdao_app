import { CampaignDto, CampaignSearch, GetPackingRequest, CampaignRule, CampaignCreateDto, CampaignV1Rule, CampaignProvincesUpdate } from './../../interfaces/dtos/campaign.dto';
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

const servereUrl = `${Environment.host}${Environment.endpoint.systemEndpoint.campaignEndpoint}`;
@Injectable({
	providedIn: 'root',
})
export class CampaignService extends BaseService {
	constructor(
		_httpUtil: HttpUtil,
		_stringUtil: StringUtil,
		_translateService: TranslateService
	) {
		super(_httpUtil, _stringUtil, _translateService);
	}
	campaignList!: CampaignDto[];

	getCampaignList(
		body: GetPackingRequest
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.campaign_list}`;

			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	getCampaignDetail(
		campaignID: number,
		campaignType: number
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.campaign_detail}/${campaignType}/${campaignID}`;
			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.log(error);
			return null;
		}
	}


	advancedSearch(
		searchCampaign: CampaignSearch
	): Observable<CommonResponses> | null {
		try {
			let endpoint = servereUrl;
			let requestUrl = `${endpoint}${RouterService.campaign_search}`;
			console.log('search campaign', searchCampaign);

			return this._httpUtil.doPost(requestUrl, searchCampaign);
		} catch (error) {
			return null;
		}
	}

	addRuleCampaign(ruleData: CampaignV1Rule, campaignId: number): Observable<CommonResponses> | null {
		try {
			let endpoint = servereUrl;
			let requestUrl = `${endpoint}${RouterService.campaign_rule}${RouterService.campaign_rule_add}/${campaignId}`

			console.log('rule data', ruleData)
			console.log('campaignId', campaignId)

			return this._httpUtil.doPost(requestUrl, ruleData)
		} catch (error) {
			console.log(error);

			return null
		}
	}

	deleteRuleCampaign(campaignId: number, productId: number): Observable<CommonResponses> | null {
		try {

			let endpoint = servereUrl;
			let requestUrl = `${endpoint}${RouterService.campaign_rule}${RouterService.campaign_rule_delete}/${campaignId}/${productId}`
			console.log('campaignId', campaignId);
			console.log('productId', productId);

			return this._httpUtil.doDelete(requestUrl)

		} catch (error) {
			console.log(error)

			return null
		}
	}

	updateProvincesCampaing(dataProvinces: CampaignProvincesUpdate, campaignId: number): Observable<CommonResponses> | null {
		try {
			let endpoint = servereUrl
			let requestUrl = `${endpoint}${RouterService.provinces}${RouterService.provinces_update}/${campaignId}`

			console.log('campaignId', campaignId);
			console.log('dataProvinces', dataProvinces);

			return this._httpUtil.doPost(requestUrl, dataProvinces)
		} catch (error) {
			console.log(error);
			return null

		}
	}

	public doDeactiveCampaign(
		slug: number,
		activeStatus: number
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.campaign_deactive}/${slug}`;

			const paramsBody = {
				activeStatus: activeStatus,
			};

			return this._httpUtil.doPatch(requestUrl, paramsBody);
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	doDeleteCampaign(campaignID: number): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.campaign_delete}/${campaignID}`;
			console.log(requestUrl);
			return this._httpUtil.doDelete(requestUrl);
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	public doActiveCampaign(
		slug: number,
		activeStatus: number
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.campaign_active}/${slug}`;

			const paramsBody = {
				activeStatus: activeStatus,
			};

			return this._httpUtil.doPatch(requestUrl, paramsBody);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	doUpdateCampaign(
		data: FormData,
		slug: number
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.campaign_update_info}/${slug}`;
			//call api create
			console.log('data: ', data);

			return this._httpUtil.doUpload(requestUrl, data);
		} catch (error) {
			console.log(error);
			return null;
		}
	}


	createCampaign(
		newCampaign: FormData
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.campaign_create}`;
			console.log('create campaign', newCampaign);
			return this._httpUtil.doUpload(requestUrl, newCampaign);
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	getQrHistoryList(body: GetPackingRequest, campaignId: number): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.campaign_qrcode_history}/${campaignId}`;
			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
