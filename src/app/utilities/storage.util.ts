
import { Injectable } from "@angular/core";

import { ValidationUtil } from '@utilities/validation.util';

import * as CommonConstants from '@app/constants';
import { LogUtil } from "@utilities/logs.util";

import { EStorageType } from "@app/constants";

@Injectable({
   providedIn: 'root'
})
export class StorageUtil {

   constructor(
   ) {
   }

	public static storeValue(storeKey: string, objValue: any, storageType?: EStorageType): void {
      if (!storeKey || !objValue) {
			return console.log('Save data has been errors!');
      }

		const storeValue: string = JSON.stringify(objValue);

		localStorage.setItem(storeKey, storeValue);

   }

	public static checkExistKey(storedKey: string): boolean {
      if (!storedKey) {
			return false;
      }

		const storedValue: any = localStorage.getItem(storedKey);

		if(storedValue){
			return true;
		}
		return false;
   }

	public static getValue(storedKey: string): any {
      if (!storedKey) {
			return console.log('Get data in store has been errors!');
      }

		const storedValue: any = localStorage.getItem(storedKey);

		if(storedValue){
			return JSON.parse(storedValue);
		}
		return null;
   }

	public static removeStoredValue(storedKey: string): any {
      if (!storedKey) {
			return console.log('Get data in store has been errors!');
      }

		const storedValue: any = localStorage.getItem(storedKey);

		if(storedValue){
			localStorage.removeItem(storedKey);
		}
		return null;
   }

	public static clearStorage(): void {
		return localStorage.clear();
   }
}
