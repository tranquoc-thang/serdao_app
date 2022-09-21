import { Injectable } from '@angular/core';
import {
	AsyncValidatorFn,
	ValidatorFn,
	AbstractControl,
	ValidationErrors,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//Import Userdefination Services
import { CommonService } from '@app/services/common/common.service';
import { CommonResponses } from '@app/interfaces/dtos/common-responses.dto';

@Injectable({
	providedIn: 'root',
})
export class ValidationUtil {
	constructor(private commonService: CommonService) {}

	public checkValidEmail(control: AbstractControl): ValidationErrors | null {
		console.log('checkValidEmail:', control.value);
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!re.test(String(control.value).toLowerCase())) {
			console.log('validation util wrong data');

			return { checkValidEmail: true, message: 'Invalid email' };
		}

		return null;
	}

	public checkValidPassword(
		control: AbstractControl
	): ValidationErrors | null {
		console.log('checkValidPassword:', control.value);
		const lowerCaseLetters = /[a-z]/g;
		const upperCaseLetters = /[A-Z]/g;
		const numbers = /[0-9]/g;
		if (String(control.value).length < 8) {
			console.log('password at least 8 characters');

			return {
				checkValidPassword: true,
				message: 'Password at least 8 characters',
			};
		}

		if (
			!lowerCaseLetters.test(String(control.value)) ||
			!upperCaseLetters.test(String(control.value)) ||
			!numbers.test(control.value)
		) {
			console.log(
				'Password at least one number and one uppercase and lowercase letter'
			);

			return {
				checkValidPassword: true,
				message:
					'Password at least one number and one uppercase and lowercase letter',
			};
		}

		return null;
	}

	public checkMatchOther(otherControlName: string): ValidationErrors {
		const validator = (control: AbstractControl): { [key: string]: any } => {
			const otherControl: AbstractControl | null =
				control.root.get(otherControlName);
			if (otherControl) {
				const subscription: Subscription =
					otherControl.valueChanges.subscribe(() => {
						control.updateValueAndValidity();
						subscription.unsubscribe();
					});
			}
			return otherControl && control.value !== otherControl.value
				? { checkMatchOther: true }
				: { checkMatchOther: false }; // : null;
		};
		return validator;
	}

	public emailExistingValidator(
		tableName: string,
		columnName: string,
		withOut?: boolean
	): AsyncValidatorFn {
		return (
			control: AbstractControl
		):
			| Promise<ValidationErrors | null>
			| Observable<ValidationErrors | null> => {
			let newEmailValue: string = control.value;

			return this.commonService
				.getValidationUnique(tableName, columnName, newEmailValue, withOut)
				.pipe(
					map(
						(result: CommonResponses) => {
							// console.log("Call API Unique Success");
							console.log(result);
							if (result.responseStatus === 200) {
								if (result.content.datas) {
									return { exist: result.content.datas };
								}
							}
							return null;
						},
						(errors: any) => {
							// console.log("Call API Unique Fail");
							console.log(errors.message);
							return null;
						}
					)
				);
		};
	}

	//     public checkNotMatchOther(otherControlName: string): ValidatorFn {
	//         const validator = (control: AbstractControl): { [key: string]: any } => {
	//             const otherControl: AbstractControl = control.root.get(otherControlName);
	//             if (otherControl) {
	//                 const subscription: Subscription = otherControl
	//                     .valueChanges
	//                     .subscribe(() => {
	//                         control.updateValueAndValidity();
	//                         subscription.unsubscribe();
	//                     });
	//             }
	//             return (otherControl && control.value === otherControl.value) ? { matchWithOld: true } : null;
	//         }
	//         return validator;
	//     }

	//     public existingValidator(column: string, type?: string, withOut?: boolean): AsyncValidatorFn {
	//         const validator = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
	//             let oldEmail: string = "";
	//             if (withOut) {
	//                 oldEmail = control.parent.value.txtOldEmail;
	//             }
	//             return this.commonService.getValidationUnique(column, control.value, type, oldEmail).pipe(
	//                 map(
	//                     result => {
	//                         // console.log("Call API Unique Success");
	//                         // console.log(result);
	//                         if (result.status === 1) {
	//                             if (result.data.unique) {
	//                                 return { unique: result.data.unique };
	//                             }
	//                         }
	//                         return null;
	//                     }, errors => {
	//                         // console.log("Call API Unique Fail");
	//                         // console.log(errors.message);
	//                         return null;
	//                     }
	//                 )
	//             );
	//         };
	//         return validator;
	//     }

	//     public postalCodeValidator(column: string): AsyncValidatorFn {
	//         const validator = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

	//             return this.commonService.getValidationPostalCode(control.value).pipe(
	//                 map(
	//                     result => {
	//                         // console.log("Call API Valid Postal Exist Success");
	//                         if (result.status === 1) {
	//                             if (!result.data.exist) {
	//                                 return { notexist: true };
	//                             }
	//                         }
	//                         return null;
	//                     }, errors => {
	//                         // console.log("Call API Valid Postal Exist Fail");
	//                         // console.log(errors.message);
	//                         return null;
	//                     }
	//                 )
	//             );
	//         };

	//         return validator;
	//     }

	//     public creditValidator(months: string, year: string, cvv: string, ownerName: string): AsyncValidatorFn {
	//         return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
	//             return null;
	//         };
	//     }

	//     /**
	//      * check Datetime Range
	//      * @author Viet Ngo
	//      * @param dateField1
	//      * @return boolean
	//      **/
	//     public checkDatetimeRange(dateField1: string, timeField1: string, dateField2: string, timeField2: string): ValidatorFn {
	//         const validator = (control: AbstractControl): { [key: string]: boolean } | null => {
	//             const date1: AbstractControl = control.root.get(dateField1);
	//             const time1: AbstractControl = control.root.get(timeField1);
	//             const date2: AbstractControl = control.root.get(dateField2);
	//             const time2: AbstractControl = control.root.get(timeField2);

	//             if (date1 && time1 && date2 && time2) {
	//                 if ((date1.value !== null && date2.value !== null)) {
	//                     let fromDateValue = date1.value.split('-');
	//                     let toDateValue = date2.value.split('-');
	//                     let fromDate = new Date(fromDateValue[0], parseInt(fromDateValue[1]) - 1, fromDateValue[2]);
	//                     let toDate = new Date(toDateValue[0], parseInt(toDateValue[1]) - 1, toDateValue[2]);
	//                     if (fromDate > toDate) {
	//                         return { invalid: true }; //failed
	//                     }
	//                 }
	//             }

	//             return null; //success
	//         };

	//         return validator;
	//     }

	//     /**
	//      * check Datetime Range 2
	//      * @author Viet Ngo
	//      * @param dateField1
	//      * @return boolean
	//      **/
	//     public checkDatetimeRange2(formControl: any, dateField1: string, timeField1: string, dateField2: string, timeField2: string) {
	//         const date1: AbstractControl = formControl.get(dateField1);
	//         const time1: AbstractControl = formControl.get(timeField1);
	//         const date2: AbstractControl = formControl.get(dateField2);
	//         const time2: AbstractControl = formControl.get(timeField2);

	//         if (date1 && time1 && date2 && time2) {
	//             if (date1.value !== null && date2.value !== null) {

	//                 let fromDate = new Date(date1.value + ' ' + (time1.value ? time1.value + ':00' : '00:00:00'));
	//                 let toDate = new Date(date2.value + ' ' + (time2.value ? time2.value + ':00' : '00:00:00'));

	//                 if (fromDate > toDate) {
	//                     return true; //failed
	//                 }
	//             }
	//         }

	//         return null; //success
	//     }

	/**
	 * Validation any is number
	 * @author VinhNguyen
	 * @param oibject: any
	 * @returns true if is number
	 **/
	validNumber(obj: any): boolean {
		let result: boolean = false;
		if (!obj) {
			return result;
		}

		let checkObj: string = obj;
		if (!checkObj) {
			return result;
		}

		try {
			const validNumerInt: number = parseInt(checkObj);
			const validNumerFloat: number = parseFloat(checkObj);

			const checkNum: any = new Number(checkObj);
			if (checkNum) {
				if (!isNaN(checkNum)) {
					result = true;
				}
			}
		} catch (e) {
			console.log(e);
		}

		return result;
	}

	//     menuActive(parent: string, child: string) {
	//         if (!isNull(child)) {

	//             $('.isActive').removeClass('active');
	//             $('#admin-' + parent).removeClass('active');
	//             $('#'+ child).parent().parent().removeClass('active');
	//             $('#'+ child).addClass('active');
	//         } else {
	//             if(!isNull(parent)) {
	//                 $('#admin-'+ parent).addClass('active');
	//             }
	//         }
	//     }

	//     /**
	//      * check Datetime Range 3
	//      * @author Viet Ngo
	//      * @param dateField1
	//      * @return boolean
	//      **/
	//     public checkDatetimeRange3(date1, time1, date2, time2) {
	//         if (date1 && date2) {

	//             // let arrDate1 = date1.split('-');
	//             let arrTime1 = time1 ? time1.split(':') : null;

	//             // let arrDate2 = date2.split('-');
	//             let arrTime2 = time2 ? time2.split(':') : null;

	//             let fromDate = new Date(date1);

	//             if(arrTime1){
	//                 fromDate.setHours(arrTime1[0]);
	//                 fromDate.setMinutes(arrTime1[1]);
	//             }

	//             let toDate = new Date(date2);
	//             if(arrTime2){
	//                 toDate.setHours(arrTime2[0]);
	//                 toDate.setMinutes(arrTime2[1]);
	//             }

	//             if (fromDate > toDate) {
	//                 return true; //failed
	//             }
	//         }

	//         return null; //success
	//     }
}
