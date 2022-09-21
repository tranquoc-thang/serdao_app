import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingPage } from './onboarding.page';
import { OnboardingPageRoutingModule } from './onboarding-routing.module';
import { BaseModule } from '../base.module';

@NgModule({
	imports: [CommonModule, BaseModule, OnboardingPageRoutingModule],
	declarations: [OnboardingPage],
	entryComponents: [OnboardingPage],
	bootstrap: [OnboardingPage],
})
export class OnboardingPageModule {}
