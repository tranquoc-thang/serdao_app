import { Injectable } from '@angular/core';
import { CommonRequests } from '@app/interfaces/dtos/common-requests.dto';
import { CommonResponses } from '@app/interfaces/dtos/common-responses.dto';
import {
	CompanyDto,
	CompanyGetDetailDto,
	CompanyGetListDto,
} from '@app/interfaces/dtos/company.dto';
import { HttpUtil } from '@app/utilities/http.util';
import { StringUtil } from '@app/utilities/string.util';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { RouterService } from '../common.router.service';
import {
	CustomerCreateDto,
	CustomerSearch,
	CustomerUpdate,
	CustomerRequestingUpdationSearch,
	CustomerUpdateDto,
} from '@app/interfaces/dtos/customer.dto';

const servereUrl = `${Environment.host}${Environment.endpoint.systemEndpoint.customerEndpoint}`;

@Injectable({
	providedIn: 'root',
})
export class CustomerService extends BaseService {
	constructor(
		_httpUtil: HttpUtil,
		_stringUtil: StringUtil,
		_translateService: TranslateService
	) {
		super(_httpUtil, _stringUtil, _translateService);
	}

	companyList!: CompanyDto[];
	currentCompany!: CompanyDto;
	detailCompany!: CompanyGetDetailDto;

	// GET customer request updation
	getCustomerRequestUpdationList(
		body: CommonRequests
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_request}${RouterService.customer_get_list}`;

			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	// Get detail profile customer request updation
	getCustomerRequestUpdationProfile(
		customerNo: string
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_request}${RouterService.customer_profile}/${customerNo}`;

			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	// approve request updation profile
	approveRequestingProfile(
		body: CustomerUpdateDto,
		customerNo: string
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_request}${RouterService.customer_profile}${RouterService.customer_approve}/${customerNo}`;

			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	deletionRequestingProfile(
		customerNo: string
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_request}${RouterService.customer_profile}${RouterService.customer_delete}/${customerNo}`;

			return this._httpUtil.doDelete(requestUrl);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	saveRequestingProfile(
		body: CustomerUpdateDto,
		customerNo: string
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_request}${RouterService.customer_profile}${RouterService.customer_save}/${customerNo}`;

			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	// get all
	getCustomerList(body: CommonRequests): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_get_list}`;

			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	getList(body: CompanyGetListDto): Observable<CommonRequests> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.company_get_detail}`;
			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	//get details company
	getDetailCompany(slug: string): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.company_get_detail}/${slug}`;
			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	//create company
	createCustomer(
		newCustomer: CustomerCreateDto
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_create}`;
			console.log('create customer', newCustomer);
			return this._httpUtil.doPost(requestUrl, newCustomer);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	advancedSearch(
		searchCustomer: CustomerSearch
	): Observable<CommonResponses> | null {
		try {
			let endpoint = servereUrl;
			let requestUrl = `${endpoint}${RouterService.customer_search}`;
			console.log('search customer', searchCustomer);

			return this._httpUtil.doPost(requestUrl, searchCustomer);
		} catch (error) {
			return null;
		}
	}

	advancedSearchRequestingUpdation(
		searchCustomer: CustomerRequestingUpdationSearch
	): Observable<CommonResponses> | null {
		try {
			let endpoint = servereUrl;
			let requestUrl = `${endpoint}${RouterService.customer_request}${RouterService.customer_get_list}`;
			console.log('advancedSearchRequestingUpdation', searchCustomer);

			return this._httpUtil.doPost(requestUrl, searchCustomer);
		} catch (error) {
			return null;
		}
	}

	//update company
	// updateCompany(data: CompanyUpdateDto): Observable<CommonResponses> | null {
	// 	try {
	// 		let endpointUrl = servereUrl;
	// 		let requestUrl = `${endpointUrl}${RouterService.company_update}/${data.companyId}`;
	// 		//call api create
	// 		console.log(requestUrl);
	// 		console.log(data);

	// 		return this._httpUtil.doPut(requestUrl, data.newCompany);
	// 	} catch (error) {
	// 		console.log(error);
	// 		return null;
	// 	}
	// }

	setCurrentCompany(detailCompany: CompanyGetDetailDto) {
		this.detailCompany = detailCompany;
	}

	public doDeactiveCustomer(
		slug: string,
		activeStatus: number
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_deactive}/${slug}`;

			const paramsBody = {
				activeStatus: activeStatus,
			};

			return this._httpUtil.doPatch(requestUrl, paramsBody);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public doActiveCustomer(
		slug: string,
		activeStatus: number
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_active}/${slug}`;

			const paramsBody = {
				activeStatus: activeStatus,
			};

			return this._httpUtil.doPatch(requestUrl, paramsBody);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public doDeleteCustomer(
		customerNo: string
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_delete}/${customerNo}`;

			return this._httpUtil.doDelete(requestUrl);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public doDeleteNewCustomer(
		slug: string
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_new_delete}/${slug}`;

			return this._httpUtil.doDelete(requestUrl);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	// public sendActivateEmail(email: string): Observable<CommonResponses> | null {
	// 	try {
	// 		let endpointUrl = servereUrl;
	// 		let requestUrl = `${endpointUrl}${RouterService.company_resend_activation}`;
	// 		const paramsBody = {
	// 			companyEmail: email,
	// 		};
	// 		return this._httpUtil.doPost(requestUrl, paramsBody);
	// 	} catch (error) {
	// 		console.log(error);
	// 		return null;
	// 	}
	// }

	public doVerificationCustomer(
		slug: string,
		activeStatus: number
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_verify}/${slug}`;
			const paramsBody = {
				activeStatus: activeStatus,
			};
			console.log('verify');
			return this._httpUtil.doPatch(requestUrl, paramsBody);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	getNewCustomerList(
		body: CommonRequests
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_get_new_list}`;
			console.log(this._httpUtil.doPost(requestUrl, body));
			return this._httpUtil.doPost(requestUrl, body);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	getProfileCustomer(slug: string): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_get_profile}/${slug}`;
			console.log('get on service, slug: ', slug);
			console.log('endpointUrl', endpointUrl);
			console.log('requestUrl', requestUrl);
			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	doUpdateListCustomer(
		data: FormData,
		slug: string
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_update}/${slug}`;
			//call api create
			console.log('data: ', data);

			return this._httpUtil.doUpload(requestUrl, data);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	updateNewCustomer(
		data: FormData,
		slug: string
	): Observable<CommonResponses> | null {
		try {
			let endpointUrl = servereUrl;
			let requestUrl = `${endpointUrl}${RouterService.customer_update}/${slug}`;
			//call api create
			console.log('data: ', data);

			return this._httpUtil.doUpload(requestUrl, data);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	advancedSearchNewCustomer(
		searchCustomer: CustomerSearch
	): Observable<CommonResponses> | null {
		try {
			let endpoint = servereUrl;
			let requestUrl = `${endpoint}${RouterService.customer_new_search}`;
			console.log('search customer', searchCustomer);

			return this._httpUtil.doPost(requestUrl, searchCustomer);
		} catch (error) {
			return null;
		}
	}
}
