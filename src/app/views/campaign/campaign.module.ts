import { DialogEditSpecialGiftComponent } from './dialog-edit-campaign/dialog-edit-special-gift/dialog-edit-special-gift.component';
import { DialogEditQuarterlyGiftComponent } from './dialog-edit-campaign/dialog-edit-quarterly-gift/dialog-edit-quarterly-gift.component';
import { DialogEditMonthlyGiftComponent } from './dialog-edit-campaign/dialog-edit-monthly-gift/dialog-edit-monthly-gift.component';
import { DialogAddSpecialGiftComponent } from './dialog-edit-campaign/dialog-add-special-gift/dialog-add-special-gift.component';
import { DialogAddQuarterlyGiftComponent } from './dialog-edit-campaign/dialog-add-quarterly-gift/dialog-add-quarterly-gift.component';
import { DialogAddGift3Component } from './dialog-edit-campaign3/dialog-add-gift3/dialog-add-gift3.component';
import { DialogEditGift3Component } from './dialog-edit-campaign3/dialog-edit-gift3/dialog-edit-gift3.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignEditComponent } from './campaign-edit/campaign-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { BaseModule } from '../base.module';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogAddCampaignComponent } from './dialog-add-campaign/dialog-add-campaign.component';
import { DialogEditCampaignV1Component } from './dialog-edit-campaign-v1/dialog-edit-campaign-v1.component'
import { DialogEditCampaignComponent } from './dialog-edit-campaign/dialog-edit-campaign.component';
import { DialogEditCampaign3Component } from './dialog-edit-campaign3/dialog-edit-campaign3.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DialogAddNormalOrSpecialGiftComponent } from './dialog-edit-campaign-v1/dialog-add-normal-or-special-gift/dialog-add-normal-or-special-gift.component';
import { DialogEditNormalOrSpecialGiftComponent } from './dialog-edit-campaign-v1/dialog-edit-normal-or-special-gift/dialog-edit-normal-or-special-gift.component';
import { QrcodeHistoryListComponent } from './qrcode-history-list/qrcode-history-list.component';
import { AdvanceSearchHistoryListQrcodeComponent } from './advance-search-history-list-qrcode/advance-search-history-list-qrcode.component';
import { ProvinceTabComponent } from './province-tab/province-tab.component';

@NgModule({
	declarations: [
		DialogEditCampaignComponent,
		DialogAddQuarterlyGiftComponent,
		DialogAddSpecialGiftComponent,
		DialogEditMonthlyGiftComponent,
		DialogEditQuarterlyGiftComponent,
		DialogEditSpecialGiftComponent,
		AdvanceSearchComponent,
		CampaignListComponent,
		CampaignEditComponent,
		DialogAddCampaignComponent,
		DialogEditCampaignV1Component,
		DialogAddNormalOrSpecialGiftComponent,
		DialogEditNormalOrSpecialGiftComponent,
		DialogEditCampaign3Component,
		DialogAddGift3Component,
		DialogEditGift3Component,
		QrcodeHistoryListComponent,
		AdvanceSearchHistoryListQrcodeComponent,
 		 ProvinceTabComponent,
	],
	imports: [
		CommonModule,
		CampaignRoutingModule,
		CommonModule,
		BaseModule,
		MatFormFieldModule,
		MatInputModule,
		MatTabsModule,
		InputMaskModule,
		FieldsetModule,
		CardModule,
		PanelModule,
		InputTextModule,
		CalendarModule,
		BadgeModule,
		CheckboxModule,
		ToastModule,
		TableModule,
		ButtonModule,
		DynamicDialogModule,
		DropdownModule,
	],
})
export class CampaignModule { }
