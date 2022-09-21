
import { Injectable } from "@angular/core";

import { ValidationUtil } from '@utilities/validation.util';

import * as CommonConstants from '@app/constants';


// var kansuji = require("kansuji");

@Injectable({
   providedIn: 'root'
})
export class DateUtil {

   constructor(
      private validationUtil: ValidationUtil
   ) {
   }

	public convertDateToDateString(strValue: string): string {
      if (!strValue) {
         return "";
      }
      let tempDate = new Date(strValue);
		let tempMonth = tempDate.getUTCMonth() < 9 ? `0${tempDate.getUTCMonth() + 1}` : tempDate.getUTCMonth();

      return `${tempDate.getUTCFullYear()}-${tempMonth}-${tempDate.getUTCDate()}`;
   }

	public convertStringToDate(strValue: string): Date | null {
      if (!strValue) {
         return null;
      }
		var regex = / /gi;
      return new Date(strValue.replace(regex, "T"));
   }

   public validateDate(strValue: string): boolean {
      if (!strValue || strValue === "Invalid date") {
         return false;
      }
      try {
         let tempDate = new Date(strValue);
         return true;
      } catch (error) {
         return false;
      }
   }

   public getRawDateFromJapaneseStringDate(strValue: string): Date {
      if (!strValue || strValue === "Invalid date") {
         return new Date();
      }
      let tempDate = new Date(strValue);
      return tempDate;
   }


   public getYear(strValue: string): number {
      if (!strValue) {
         return 0;
      }

      let tempDate = new Date(strValue);

      return tempDate.getUTCFullYear();
   }

   public getMonth(strValue: string): number {
      if (!strValue) {
         return 0;
      }
      let tempDate = new Date(strValue);

      return tempDate.getUTCMonth();
   }

   public getDate(strValue: string): number {
      if (!strValue) {
         return 0;
      }
      let tempDate = new Date(strValue);

      return tempDate.getUTCDate();
   }

   public getLastDateOfMonth(strValue: string): number {
      if (!strValue) {
         return 0;
      }
      let tempDate = new Date(strValue);
      let y = tempDate.getUTCFullYear();
      let m = tempDate.getUTCMonth();
      var lastDay = new Date(y, m + 1, 0);

      return lastDay.getUTCDate();
   }

   public getJapaneseDay(strValue: string): string | null {
      if (!strValue) {
         return null;
      }
      let numDay: number = this.getDay(strValue);

      var japaneseDay: string = "";
      switch (numDay) {
         case (1):
            japaneseDay = "月曜日";
            break;
         case (2):
            japaneseDay = "火曜日";
            break;
         case (3):
            japaneseDay = "水曜日";
            break;
         case (4):
            japaneseDay = "木曜日";
            break;
         case (5):
            japaneseDay = "金曜日";
            break;
         case (6):
            japaneseDay = "土曜日";
            break;
         default:
            japaneseDay = "日曜日";
            break;
      }

      return japaneseDay;
   }

   public getDay(strValue: string): number {
      if (!strValue) {
         return 0;
      }
      let tempDate = new Date(strValue);

      return tempDate.getUTCDay();
   }
}
