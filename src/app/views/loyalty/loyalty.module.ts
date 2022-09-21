import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyaltyGiftListComponent } from './loyalty-gift-list/loyalty-gift-list.component';
import { LoyaltyRuleComponent } from './loyalty-rule/loyalty-rule.component';
import { LoyaltyRoutingModule } from './loyalty-routing.module';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { LoyaltyDialogCreateProductComponent } from './loyalty-dialog-create-product/loyalty-dialog-create-product.component';
import { LoyaltyDialogUpdateProductComponent } from './loyalty-dialog-update-product/loyalty-dialog-update-product.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { BadgeModule } from 'primeng/badge';
import { BaseModule } from '../base.module';
import { FileUploadModule } from 'primeng/fileupload';
import { QrcodeHistoryListComponent } from './qrcode-history-list/qrcode-history-list.component';
import { AdvanceSearchHistoryListQrcodeComponent } from './advance-search-history-list-qrcode/advance-search-history-list-qrcode.component';
import { LoyaltyGiftExchangeComponent } from './loyalty-gift-exchange/loyalty-gift-exchange.component';
import { LoyaltyGiftExchangeAdvancedSearchComponent } from './loyalty-gift-exchange-advanced-search/loyalty-gift-exchange-advanced-search.component';
import { LoyaltyGiftExchangeUpdateComponent } from './loyalty-gift-exchange-update/loyalty-gift-exchange-update.component';

@NgModule({
	declarations: [
		LoyaltyRuleComponent,
		LoyaltyGiftListComponent,
		AdvanceSearchComponent,
		LoyaltyDialogCreateProductComponent,
		LoyaltyDialogUpdateProductComponent,
		QrcodeHistoryListComponent,
		AdvanceSearchHistoryListQrcodeComponent,
		LoyaltyGiftExchangeComponent,
		LoyaltyGiftExchangeAdvancedSearchComponent,
		LoyaltyGiftExchangeUpdateComponent,
	],

	imports: [
		CommonModule,
		LoyaltyRoutingModule,
		BaseModule,
		MatFormFieldModule,
		MatInputModule,
		MatTabsModule,
		InputMaskModule,
		FieldsetModule,
		CardModule,
		PanelModule,
		InputTextModule,
		ButtonModule,
		CalendarModule,
		BadgeModule,
		FileUploadModule,
	],
})
export class LoyaltyModule {}
