//Import System Library
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { CommonService } from '@app/services/common/common.service';

import { ValidationUtil } from '@app/utilities/validation.util';

import { EToastIconClasses, EToastType } from '@constants/settings.constants';

//Third library
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material/dialog';
import { Environment } from '@environments/environment';

@Injectable()
export class BaseComponent {
	public postBackUrl: string = '/tabs/home';
	public loadingTime: number = 500;

	public brithdayPickerOptions = {
		backdropDismiss: true,
		showBackdrop: true,
	};

	public currentDate: Date = new Date();

	constructor(
		public _activatedRoute: ActivatedRoute,
		public _pageTitle: Title,
		public _router: Router,
		public _materialDialog: MatDialog,
		public _common: CommonService,
		public _validate: ValidationUtil,
		public _toast: ToastrService,
		public _translateService: TranslateService,
		public _dialog: DialogService
	) {}

	ngOnInit(): void {}

	ngAfterContentInit(): void {}

	ngAfterViewInit(): void {}

	ngOnDestroy(): void {}

	toastSuccess(message: string) {
		this._toast.success(message);
	}
	toastWarning(message: string) {
		this._toast.warning('warning', message);
	}
	toastSError(message: string) {
		this._toast.error('error', message);
	}

	async presentToast(
		type: EToastType,
		mess: string,
		duration?: number,
		title?: string
	) {
		const currentToastId = localStorage.getItem('currentToastId');
		if (currentToastId) {
			this._toast.clear(+currentToastId);
		}

		let toastType: string = EToastIconClasses.success;
		if (type == 'error') {
			toastType = EToastIconClasses.error;
		} else if (type == 'warning') {
			toastType = EToastIconClasses.warning;
		} else if (type == 'info') {
			toastType = EToastIconClasses.info;
		}

		let toastDuration = 5000;
		if (duration) {
			toastDuration = duration;
		}

		// override?: Partial<IndividualConfig>
		let override = {
			disableTimeOut: false,
			timeOut: toastDuration,
			closeButton: true,
			extendedTimeOut: 5000,
			progressBar: true,
			enableHtml: true,
			toastClass: 'ngx-toastr',
			positionClass: 'toast-top-right',
			titleClass: 'toast-title',
			messageClass: 'toast-message',
			easing: 'ease-in',
			easeTime: 300,
			tapToDismiss: true,
			onActivateTick: true,
			newestOnTop: true,
		};

		const toastShown = this._toast.show(mess, title, override, toastType);

		localStorage.setItem('currentToastId', toastShown.toastId.toString());
	}

	public handleAvatarError(eventTarget: any): void {
		console.log(eventTarget);
		eventTarget.src = Environment.defaults.images.avatar;
	}

	public handleImageError(eventTarget: any): void {
		eventTarget.src = Environment.defaults.images.imageNotFound;
	}

	public checkIfImageExists(url: string): string {
		const img = new Image();

		img.src = url;

		if (img.complete) {
			return url;
		} else {
			img.onload = () => {
				return url;
			};
			img.onerror = () => {
				return Environment.defaults.images.avatar;
			};
		}

		return url;
	}

	// public openPageWithDirectionLeft(route: string): void {
	// 	if (route) {
	// 		if (this._platform.is('hybrid')) {
	// 			let pageTransitionOptions: NativeTransitionOptions = {
	// 				direction: 'left',
	// 				duration: 300,
	// 				slowdownfactor: 0,
	// 				slidePixels: 0,
	// 				iosdelay: 0,
	// 				androiddelay: 0,
	// 				fixedPixelsTop: 0,
	// 				fixedPixelsBottom: 0
	// 			};
	// 			this._nativePageTransitions.slide(pageTransitionOptions);
	// 			this._navController.navigateRoot(route);
	// 		}
	// 		this._navController.navigateRoot(route);
	// 	}
	// }

	// public openPageWithDirectionRight(route: string): void {
	// 	if (route) {
	// 		if (this._platform.is('hybrid')) {
	// 			let pageTransitionOptions: NativeTransitionOptions = {
	// 				direction: 'right',
	// 				duration: 300,
	// 				slowdownfactor: 0,
	// 				slidePixels: 0,
	// 				iosdelay: 0,
	// 				androiddelay: 0,
	// 				fixedPixelsTop: 0,
	// 				fixedPixelsBottom: 0
	// 			};
	// 			this._nativePageTransitions.slide(pageTransitionOptions);
	// 		}
	// 		this._navController.navigateRoot(route);
	// 	}
	// }

	// public openPageWithDirectionUp(route: string): void {
	// 	if (route) {
	// 		if (this._platform.is('hybrid')) {
	// 			let pageTransitionOptions: NativeTransitionOptions = {
	// 				direction: 'up',
	// 				duration: 300,
	// 				slowdownfactor: 0,
	// 				slidePixels: 0,
	// 				iosdelay: 0,
	// 				androiddelay: 0,
	// 				fixedPixelsTop: 0,
	// 				fixedPixelsBottom: 0
	// 			};
	// 			this._nativePageTransitions.slide(pageTransitionOptions);
	// 			this._navController.navigateRoot(route);
	// 		}
	// 		this._navController.navigateRoot(route);
	// 	}
	// }

	// public openPageWithDirectionDown(route: string): void {
	// 	if (route) {
	// 		if (this._platform.is('hybrid')) {
	// 			let pageTransitionOptions: NativeTransitionOptions = {
	// 				direction: 'down',
	// 				duration: 300,
	// 				slowdownfactor: 0,
	// 				slidePixels: 0,
	// 				iosdelay: 0,
	// 				androiddelay: 0,
	// 				fixedPixelsTop: 0,
	// 				fixedPixelsBottom: 0
	// 			};
	// 			this._nativePageTransitions.slide(pageTransitionOptions);
	// 		}
	// 		this._navController.navigateRoot(route);
	// 	}
	// }

	// public backWithDirectionDown(route: string): void {
	// 	if (route) {
	// 		if (this._platform.is('hybrid')) {
	// 			let pageTransitionOptions: NativeTransitionOptions = {
	// 				direction: 'down',
	// 				duration: 300,
	// 				slowdownfactor: 0,
	// 				slidePixels: 0,
	// 				iosdelay: 0,
	// 				androiddelay: 0,
	// 				fixedPixelsTop: 0,
	// 				fixedPixelsBottom: 0
	// 			};
	// 			this._nativePageTransitions.slide(pageTransitionOptions);
	// 		}
	// 		this._navController.navigateBack(route);
	// 	}
	// }

	// public backWithDirectionUp(route: string): void {
	// 	if (route) {
	// 		if (this._platform.is('hybrid')) {
	// 			let pageTransitionOptions: NativeTransitionOptions = {
	// 				direction: 'up',
	// 				duration: 300,
	// 				slowdownfactor: 0,
	// 				slidePixels: 0,
	// 				iosdelay: 0,
	// 				androiddelay: 0,
	// 				fixedPixelsTop: 0,
	// 				fixedPixelsBottom: 0
	// 			};
	// 			this._nativePageTransitions.slide(pageTransitionOptions);
	// 		}
	// 		this._navController.navigateBack(route);
	// 	}
	// }

	// public backWithDirectionLeft(route: string): void {
	// 	if (route) {
	// 		if (this._platform.is('hybrid')) {
	// 			let pageTransitionOptions: NativeTransitionOptions = {
	// 				direction: 'left',
	// 				duration: 300,
	// 				slowdownfactor: 0,
	// 				slidePixels: 0,
	// 				iosdelay: 0,
	// 				androiddelay: 0,
	// 				fixedPixelsTop: 0,
	// 				fixedPixelsBottom: 0
	// 			};
	// 			this._nativePageTransitions.slide(pageTransitionOptions);
	// 		}
	// 		this._navController.navigateBack(route);
	// 	}
	// }

	// public backWithDirectionRight(route: string): void {
	// 	if (route) {
	// 		if (this._platform.is('hybrid')) {
	// 			let pageTransitionOptions: NativeTransitionOptions = {
	// 				direction: 'right',
	// 				duration: 300,
	// 				slowdownfactor: 0,
	// 				slidePixels: 0,
	// 				iosdelay: 0,
	// 				androiddelay: 0,
	// 				fixedPixelsTop: 0,
	// 				fixedPixelsBottom: 0
	// 			};
	// 			this._nativePageTransitions.slide(pageTransitionOptions);
	// 		}
	// 		this._navController.navigateBack(route);
	// 	}
	// }
}
