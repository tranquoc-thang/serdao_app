//* Import System Libraries
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

//* Import Js Libraries Directive
import { ToastrModule } from 'ngx-toastr';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//* Import App Modules
import { AppRoutingModule } from '@app/app-routing.module';

//* Import App Components
import { AppComponent } from '@app/app.component';
import { MainLayoutComponent } from '@views/common/layouts/main/main.component';

//* Import App Components
import { GlobalProvider } from '@providers/global.provider';

import { AuthGuard } from '@services/authentication/auth-guard.service';
import {
	HashLocationStrategy,
	LocationStrategy,
	PathLocationStrategy,
} from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

/** AoT requires an exported function for factories */
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
/***************************************************/
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule, // required animations module
		AppRoutingModule,
		HttpClientModule,
		ToastrModule.forRoot({
			/**
			 * disable both timeOut and extendedTimeOut
			 * default: false
			 * boolean | 'timeOut' | 'extendedTimeOut'
			 */
			disableTimeOut: false,
			/**
			 * toast time to live in milliseconds
			 * default: 5000
			 */
			timeOut: 5000,
			/**
			 * toast show close button
			 * default: false
			 */
			closeButton: true,
			/**
			 * time to close after a user hovers over toast
			 * default: 1000
			 */
			extendedTimeOut: 1000,
			/**
			 * show toast progress bar
			 * default: false
			 */
			progressBar: true,
			/**
			 * changes toast progress bar animation
			 * default: decreasing
			 * 'increasing' | 'decreasing'
			 */
			progressAnimation: 'decreasing',
			/**
			 * render html in toast message (possibly unsafe)
			 * default: false
			 */
			enableHtml: true,
			/**
			 * css class on toast component
			 * default: ngx-toastr
			 */
			toastClass: 'ngx-toastr',
			/**
			 * css class on toast container
			 * default: toast-top-right
			 */
			positionClass: 'toast-top-right',
			/**
			 * css class on toast title
			 * default: toast-title
			 */
			titleClass: 'toast-title',
			/**
			 * css class on toast message
			 * default: toast-message
			 */
			messageClass: 'toast-message',
			/**
			 * animation easing on toast
			 * default: ease-in
			 */
			easing: 'ease-in',
			/**
			 * animation ease time on toast
			 * default: 300
			 * string | number
			 */
			easeTime: 300,
			/**
			 * clicking on toast dismisses it
			 * default: true
			 */
			tapToDismiss: true,
			/**
			 * Angular toast component to be shown
			 * default: Toast
			 * toastComponent?: ComponentType<any>;
			 */
			/**
			 * Helps show toast from a websocket or from event outside Angular
			 * default: false
			 */
			onActivateTick: true,
			/**
			 * New toast placement
			 * default: true
			 */
			newestOnTop: true,
			/**
			 * max toasts opened. Toasts will be queued
			 * Zero is unlimited
			 * default: 0
			 */
			maxOpened: 10,
			/**
			 * dismiss current toast when max is reached
			 * default: false
			 *
			 * iconClasses: Partial<ToastrIconClasses>;
			 *
			 */
			autoDismiss: true,
			/**
			 * block duplicate messages
			 * default: false
			 */
			preventDuplicates: true,
			/**
			 * display the number of duplicate messages
			 * default: false
			 */
			countDuplicates: false,
			/**
			 * Reset toast timeout when there's a duplicate (preventDuplicates needs to be set to true)
			 * default: false
			 */
			resetTimeoutOnDuplicate: false,
			/**
			 * consider the title of a toast when checking if duplicate
			 * default: false
			 */
			includeTitleDuplicates: false,
		}), //ToastrModule
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		FormsModule,
		NgbModule,
		DataTablesModule,
	],
	providers: [
		AuthGuard,
		GlobalProvider,
		Title,
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
