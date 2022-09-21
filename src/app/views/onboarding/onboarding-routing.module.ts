import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingPage } from './onboarding.page';

const routes: Routes = [
	{
		path: '',
		component: OnboardingPage,
		data: {
			listLabel: 'Trang Chủ',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OnboardingPageRoutingModule {}
