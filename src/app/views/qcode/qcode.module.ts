import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QcodeRoutingModule } from './qcode-routing.module';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { QrcodeTableComponent } from './qrcode-table/qrcode-table.component';
import { QrcodeListComponent } from './qrcode-list/qrcode-list.component';
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
import { QrcodeDialogCreateComponent } from './qrcode-dialog-create/qrcode-dialog-create.component';
import { QrcodeDialogDetailComponent } from './qrcode-dialog-detail/qrcode-dialog-detail.component';
import { AdvanceSearchHistoryListQrcodeComponent } from './advance-search-history-list-qrcode/advance-search-history-list-qrcode.component';

@NgModule({
	declarations: [
		AdvanceSearchComponent,
		QrcodeTableComponent,
		QrcodeListComponent,
		QrcodeDialogCreateComponent,
		QrcodeDialogDetailComponent,
		AdvanceSearchHistoryListQrcodeComponent,
	],
	imports: [
		CommonModule,
		QcodeRoutingModule,
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
	],
})
export class QcodeModule { }
