import { Injectable } from '@angular/core';
import {
	Router,
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';

import { AdminAuthenticationService } from './admin-authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private _router: Router,
		private _adminAuthenticationService: AdminAuthenticationService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this._adminAuthenticationService
			.isAuthenticated()
			.then((result) => {
				if (result) {
					return true;
				} else {
					// navigate to login page
					this._router.navigate(['/login']);
					// you can save redirect url so after authing we can move them back to the page they requested
					return false;
				}
			});
	}
}
