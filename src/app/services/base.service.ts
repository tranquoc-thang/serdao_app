//import utilities
import { CommonResponses } from '@app/interfaces/dtos/common-responses.dto';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { HttpUtil } from '@utilities/http.util';
import { StringUtil } from '@utilities/string.util';
import { Observable } from 'rxjs';
import { RouterService } from './common.router.service';

export class BaseService {
	servereUrl!: string;

	constructor(
		public _httpUtil: HttpUtil,
		public _stringUtil: StringUtil,
		public _translateService: TranslateService
	) {}

	getProductList(): Observable<CommonResponses> | null {
		try {
			let endpointUrl = `https://zeit-apis.inotek.us/apis${Environment.endpoint.systemEndpoint.productEndpoint}`;
			let requestUrl = `${endpointUrl}${RouterService.product_list}`;
			console.log(requestUrl);

			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
