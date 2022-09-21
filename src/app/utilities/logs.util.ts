import { Injectable } from '@angular/core';
import { HttpUtil } from '@utilities/http.util';
import { Environment } from '@environments/environment';

@Injectable({
	providedIn: 'root',
})
export class LogUtil {
	constructor(private _httpUtil: HttpUtil) {}


	public storeLog(level: string = 'error', objValue: any){

		const tempDate = new Date();
		const tempMonth = tempDate.getUTCMonth() < 9 ? `0${tempDate.getUTCMonth() + 1}` : tempDate.getUTCMonth();
		const currentDate = `${tempDate.getUTCFullYear()}-${tempMonth}-${tempDate.getUTCDate()}`


		const message = {
			text: ` ${ Environment.appName } | ${currentDate} asd asd asd asd as dasd `
		}

		this._httpUtil.doPostMessageToSlack(message.text);
	}
}
