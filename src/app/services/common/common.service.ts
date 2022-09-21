//Import System Library
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Environment } from '@environments/environment';
//import services
import { TranslateService } from '@ngx-translate/core';
import { RouterService } from '@app/services/common.router.service';
import { BaseService } from '@services/base.service';
//import utilities
import { HttpUtil } from '@utilities/http.util';
import { StringUtil } from '@utilities/string.util';
import { CommonResponses } from '@app/interfaces/dtos/common-responses.dto';
//import overlay and spinner
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonSpinnerComponent } from '@app/views/common/components/common-spinner/common-spinner.component';
import { Province } from '@app/interfaces/models/province.entity';
import { StorageUtil } from '@app/utilities/storage.util';
import { pluck } from 'rxjs/operators';
import { GroupList } from '@app/interfaces/models/group.entity';
import { MemberShip } from '@app/interfaces/models/member-ship.entity';

const servereUrl = `${Environment.host}`;

const baseUrl = 'https://zeit-apis.inotek.us/apis';
@Injectable({
	providedIn: 'root',
})
export class CommonService extends BaseService {
	private overlayRef!: OverlayRef;

	readonly provinceSelection!: Observable<Province[]>;
	readonly groupSelection!: Observable<GroupList[]>;
	readonly memberSelection!: Observable<MemberShip[]>;
	//Initialize Page
	constructor(
		_httpUtil: HttpUtil,
		_stringUtil: StringUtil,
		_translateService: TranslateService,
		private overlay: Overlay
	) {
		super(_httpUtil, _stringUtil, _translateService);
		this.provinceSelection = this.getProvinceList()?.pipe(
			pluck('content', 'datas', 'provincesList')
		) as Observable<Province[]>;
		this.groupSelection = this.getGroupList()?.pipe(
			pluck('content', 'datas', 'customerGroupsList')
		) as Observable<GroupList[]>;
		this.memberSelection = this.getMemberList()?.pipe(
			pluck('content', 'datas', 'datasList')
		) as Observable<MemberShip[]>;
	}

	/**
	 * Common Functions Check Email/Account Exists
	 * @author: VinhNguyen
	 * @namespace Service
	 * @method: Get
	 * @param column //Email/Account
	 * @param value
	 * @return application/json
	 */
	public getValidationUnique(
		tableName: string,
		columnName: string,
		newValue: string,
		withOut?: boolean
	): Observable<CommonResponses> {
		try {
			let requestUrl = `${servereUrl}${RouterService.check_existence}`;

			let params = {
				tableName: tableName,
				columnName: columnName,
				newValue: newValue,
				withOut: withOut ? true : false,
			};
			return this._httpUtil.doPost(requestUrl, params);
		} catch (error) {
			console.log(error);
			// return null;
			return new Observable<CommonResponses>();
		}
	}

	public getProvinceList(): Observable<Province> | null {
		try {
			let requestUrl = `${baseUrl}${Environment.endpoint.systemEndpoint.provinceEndpoint}${RouterService.province_init_list}`;
			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public getGroupList(): Observable<GroupList> | null {
		try {
			let requestUrl = `${baseUrl}${Environment.endpoint.systemEndpoint.groupListEndpoint}${RouterService.group_init_list}`;
			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public getMemberList(): Observable<MemberShip> | null {
		try {
			let requestUrl = `${servereUrl}${Environment.endpoint.systemEndpoint.membershipEndpoint}${RouterService.member_list}`;
			return this._httpUtil.doGet(requestUrl);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	/**
	 * Common Overlay Spinner
	 * @author: AnNguyen
	 * @namespace Service
	 * @method: Open Overlay
	 * @return overlay
	 */
	public attachSpinner() {
		if (!this.overlayRef) {
			this.overlayRef = this.overlay.create();
		}

		const spinnerOverlayPortal = new ComponentPortal(CommonSpinnerComponent);
		const component = this.overlayRef.attach(spinnerOverlayPortal);
	}

	public detachSpinner() {
		if (!!this.overlayRef) {
			this.overlayRef.detach();
		}
	}

	public checkIsAvatarValid(url: string) {}
}
