import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDialogContentComponent } from './customer-dialog-content/customer-dialog-content.component';
import { CustomerDialogDetailContentComponent } from './customer-dialog-detail-content/customer-dialog-detail-content.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerRequestingListComponent } from './customer-requesting-list/customer-requesting-list.component';
import { CustomerDialogRequestingListComponent } from './customer-requesting-list/customer-dialog-requesting-list/customer-dialog-requesting-list.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

import { CustomerNewComponent } from './customer-new/customer-new.component';
import { ToMemberShipPipe } from './to-member-ship.pipe';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
@NgModule({
	declarations: [
		CustomerDialogContentComponent,
		CustomerDialogDetailContentComponent,
		CustomerListComponent,
		CustomerRequestingListComponent,
		CustomerDialogRequestingListComponent,
		CustomerNewComponent,
		ToMemberShipPipe,
		CustomerUpdateComponent,
	],
	imports: [
		CommonModule,
		CustomerRoutingModule,
		BaseModule,
		MatFormFieldModule,
		MatInputModule,
		MatTabsModule,
		InputMaskModule,
		DynamicDialogModule,
		FileUploadModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [ToMemberShipPipe],
})
export class CustomerModule {}
