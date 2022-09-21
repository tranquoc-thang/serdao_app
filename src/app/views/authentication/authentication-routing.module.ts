import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/services/authentication/auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';

// import { JobsSearchComponent } from '@views/jobs/search/search.component';
// import { JobsDetailComponent } from '@views/jobs/detail/jobs-detail.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		data: {
			listLabel: 'ログイン',
		}
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent,
		data: {
			listLabel: 'パスワードを忘れた方',
		}
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
