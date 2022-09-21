import { Injectable, OnInit } from '@angular/core';
// import { Platform } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import {
	HttpClient,
	HttpHeaders,
	HttpParams,
	HttpErrorResponse,
	HttpRequest,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
// import { Device } from '@ionic-native/device/ngx';
// import { Storage } from '@ionic/storage-angular';
import { GlobalProvider } from '@providers/global.provider';
import { Environment } from '@environments/environment';
import { UserAdminDto } from '@app/interfaces/dtos/user.dto';

@Injectable({
	providedIn: 'root',
})
/**
 * Service to call all the API
 */
export class HttpUtil {
	// Set the http options
	httpOptions = {};

	adminInfo: UserAdminDto;

	constructor(private http: HttpClient) {
		this.adminInfo = GlobalProvider.adminInfo;
	}

	/**
	 * Function to handle error when the server return an error
	 *
	 * @param error
	 */
	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error(
				'Server APIs has an error occurred:',
				error.error.message
			);
		} else {
			// The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
			console.error(
				`Server APIs returned code ${error.status}, ` +
				`body was: ${error.error}`
			);
		}
		// return an observable with a user-facing error message
		return throwError(error);
	}

	/**
	 * Function to extract the data when the server return some
	 *
	 * @param res
	 */
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	/**
	 * Function GET
	 *
	 * @param requestUrl
	 */
	public doGet(requestUrl: string): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Access-Token': GlobalProvider.adminInfo
					? (GlobalProvider.adminInfo.adminAccessToken as string)
					: '',
				'Content-Type': 'application/json; charset=UTF-8',
				'App-Secret-Key': Environment.appSerectKey,
			}),
		};
		return this.http
			.get(requestUrl, httpOptions)
			.pipe(catchError(this.handleError));
	}

	/**
	 * Function Post
	 *
	 * @param requestUrl
	 * @param paramBody
	 */
	public doPost(requestUrl: string, paramBody: any): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Access-Token': GlobalProvider.adminInfo
					? (GlobalProvider.adminInfo.adminAccessToken as string)
					: '',
				'Content-Type': 'multipart/form-data; application/json; charset=UTF-8;',
				'App-Secret-Key': Environment.appSerectKey,
			}),
		};
		return this.http
			.post(requestUrl, paramBody, httpOptions)
			.pipe(catchError(this.handleError));
	}

	/**
	 * Function Put
	 *
	 * @param requestUrl
	 * @param paramBody
	 */
	public doPut(requestUrl: string, paramBody: any): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Access-Token': GlobalProvider.adminInfo
					? (GlobalProvider.adminInfo.adminAccessToken as string)
					: '',
				'Content-Type': 'application/json; charset=UTF-8',
				'App-Secret-Key': Environment.appSerectKey,
			}),
		};
		return this.http
			.put(requestUrl, paramBody, httpOptions)
			.pipe(catchError(this.handleError));
	}
	/**
	 * Function Delete
	 *
	 * @param requestUrl
	 * @param paramBody
	 */
	public doDelete(requestUrl: string): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Access-Token': GlobalProvider.adminInfo
					? (GlobalProvider.adminInfo.adminAccessToken as string)
					: '',
				'Content-Type': 'application/json; charset=UTF-8',
				'App-Secret-Key': Environment.appSerectKey,
			}),
		};

		return this.http
			.delete(requestUrl, httpOptions)
			.pipe(catchError(this.handleError));
	}

	/**
	 * Function Patch
	 *
	 * @param requestUrl
	 * @param paramBody
	 */
	public doPatch(requestUrl: string, paramBody: any): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Access-Token': GlobalProvider.adminInfo
					? (GlobalProvider.adminInfo.adminAccessToken as string)
					: '',
				'Content-Type': 'application/json; charset=UTF-8',
				'App-Secret-Key': Environment.appSerectKey,
			}),
		};

		return this.http
			.patch(requestUrl, paramBody, httpOptions)
			.pipe(catchError(this.handleError));
	}

	/**
	 * Function Upload File
	 *
	 * @param requestUrl
	 * @param paramFormData
	 */
	public doUpload(
		requestUrl: string,
		paramFormData: FormData
	): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Token': GlobalProvider.adminInfo
				? (GlobalProvider.adminInfo.adminAccessToken as string)
				: '',
			'App-Secret-Key': Environment.appSerectKey,
		});
		const request = new HttpRequest('POST', requestUrl, paramFormData, {
			headers: headers,
			// reportProgress: false,
			responseType: 'json',
		});

		return this.http.request(request);
	}

	/**
	 * Function Post Message To Slack
	 *
	 * @param message
	 */
	public doPostMessageToSlack(message: any) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded',
			}),
		};
		return this.http
			.post(
				Environment.slackEndpoint.webhook,
				{
					text: `asdadasdasd asdas das`,
				},
				httpOptions
			)
			.subscribe();
	}
}
