import { Injectable } from '@angular/core';
import * as shajs from 'sha.js';

@Injectable({
	providedIn: 'root',
})
export class StringUtil {

	public static hashPassword(strValue: string): string {
		let strRaw: string = '';
		// if (!strValue) {
		// 	return strRaw;
		// }
		// return shajs('sha256').update(strValue).digest('hex');
		return strValue;
	}

	public languageReplace(strMessage: string, arrParameter: string[]): string {
		let result: string = strMessage;
		if (!strMessage.trim()) {
			return '';
		}
		if (arrParameter.length === 0) {
			let count: number = (strMessage.match(/$/g) || []).length;
			for (let i: number = 0; i < count; i++) {
				result = strMessage.replace('$' + i, '');
			}
		} else {
			arrParameter.forEach((value, index) => {
				if (!value) {
					result = result.replace('$' + index, '');
				} else {
					result = result.replace('$' + index, value);
				}
			});
		}
		return result;
	}
}
