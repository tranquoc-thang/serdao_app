//Import Libraries
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@services/authentication/auth-guard.service';

//Import Components
import { NotFoundComponent } from '@views/common/pages/not-found/not-found.component';
import { EmptyLayoutComponent } from '@views/common/layouts/empty/empty.component';
import { AuthenticationLayoutComponent } from './views/common/layouts/authentication/authentication.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
	{
		path: '',
		loadChildren: () =>
			import('@views/authentication/authentication.module').then(
				(m) => m.AuthenticationModule
			),
		component: AuthenticationLayoutComponent,
	},
	{
		path: 'onboarding',
		loadChildren: () =>
			import('@views/onboarding/onboarding.module').then(
				(m) => m.OnboardingPageModule
			),
		data: {
			rootLabel: 'Trang chủ',
		},
		canActivate: [AuthGuard],
	},

	{
		path: 'customer',
		loadChildren: () =>
			import('./views/customer/customer.module').then(
				(m) => m.CustomerModule
			),
		data: {
			rootLabel: 'Quản lý khách hàng',
		},
		canActivate: [AuthGuard],
	},

	{
		path: 'qrcode',
		loadChildren: () =>
			import('./views/qcode/qcode.module').then((m) => m.QcodeModule),
		data: {
			rootLabel: 'Quản lý mã QR',
		},
		canActivate: [AuthGuard],
	},

	{
				path: 'loyalty',
				loadChildren: () =>
					import('./views/loyalty/loyalty.module').then((m) => m.LoyaltyModule),
				data: {
					rootLabel: 'Quản lý Loyalty',
				},
				canActivate: [AuthGuard],
	},
	{
		path: 'campaign',
		loadChildren: () =>
			import('./views/campaign/campaign.module').then(
				(m) => m.CampaignModule
			),
		data: {
			rootLabel: 'Quản lý chiến dịch',
		},
		canActivate: [AuthGuard],
	},

	{
		path: '404',
		component: EmptyLayoutComponent,
		children: [{ path: '', component: NotFoundComponent }],
	},
	{ path: '**', redirectTo: '/404' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: false })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
