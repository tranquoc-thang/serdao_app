import { NgModule } from '@angular/core';

import { AuthenticationRoutingModule } from '@views/authentication/authentication-routing.module';
import { BaseModule } from '@views/base.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from '@app/services/authentication/auth-guard.service';

// import { JobsListComponent } from '@views/jobs/list/jobs-list.component';
// import { JobsSearchComponent } from '@views/jobs/search/search.component';
// import { JobsDetailComponent } from '@views/jobs/detail/jobs-detail.component';

@NgModule({
	imports: [BaseModule, AuthenticationRoutingModule],
	declarations: [
		//Pages Component
		LoginComponent,
		ForgotPasswordComponent,
	],
	exports: [],
	providers: [AuthGuard],
})
export class AuthenticationModule { }
