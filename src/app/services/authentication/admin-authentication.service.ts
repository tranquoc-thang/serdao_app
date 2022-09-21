import { Injectable } from '@angular/core';
import {
	Router
} from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { BaseService } from '@app/services/base.service';
import { HttpUtil } from '@app/utilities/http.util';
import { StringUtil } from '@app/utilities/string.util';
import { StorageUtil } from '@app/utilities/storage.util';
import { TranslateService } from '@ngx-translate/core';
import { Environment } from '@environments/environment';
import { RouterService } from '@services/common.router.service';
import { CommonResponses } from '@app/interfaces/dtos/common-responses.dto';
import { UserLoginDto } from '@interfaces/dtos/user.dto';
import { AdminForgotDto, AdminResetPasswordDto } from '@interfaces/dtos/admin.dto';

const servereUrl = `${Environment.host}${Environment.endpoint.systemEndpoint.authEndpoint}`;

@Injectable({
	providedIn: 'root',
})
export class AdminAuthenticationService extends BaseService {
	authState = new BehaviorSubject(false);

	constructor(
		_httpUtil: HttpUtil,
		_stringUtil: StringUtil,
		_translateService: TranslateService,
		private _router: Router
	) {
		super(_httpUtil, _stringUtil, _translateService);
	}

	public doLogin(
		paramsBody: UserLoginDto
	): Observable<CommonResponses> | null {
		try {
			const requestUrl = `${servereUrl}${RouterService.admin_login}`;
			return this._httpUtil.doPost(requestUrl, paramsBody);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public isAuthenticated(): Promise<boolean> {
		const adminInfo: boolean = StorageUtil.checkExistKey('adminInfo');

		if (adminInfo) {
			this.authState.next(true);
		} else {
			this.authState.next(false);
		}

		return new Promise((resolve) => { resolve(this.authState.value); });
	}

	public doLogout(): void {
		this.authState.next(false);
		StorageUtil.removeStoredValue('adminInfo');
		this._router.navigate(['/login']);
	}

	public doForgotPassword(
		paramsBody: AdminForgotDto
	): Observable<CommonResponses> | null {
		try {
			const requestUrl = `${servereUrl}${RouterService.admin_forgot_password}`;
			return this._httpUtil.doPost(requestUrl, paramsBody);
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	public doResetPassword(
		paramsBody: AdminResetPasswordDto
	): Observable<CommonResponses> | null {
		try {
			const requestUrl = `${servereUrl}${RouterService.admin_reset_password}`;
			return this._httpUtil.doPut(requestUrl, paramsBody);
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
