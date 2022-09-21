//Library
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrMaskerModule } from "br-mask";
import { RouterModule } from '@angular/router';
//Third-Party Library
import { AngularMaterialDataGridModule } from 'angular-material-data-grid';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
//App Components

import { RoundPipe } from '@pipes/round.pipe';
import { SafeContentPipe } from '@app/pipes/self-content.pipe copy';
import { EmptyLayoutComponent } from './common/layouts/empty/empty.component';
import { MainFooterLayoutComponent } from './common/layouts/main/footer/footer.component';
import { MainHeaderLayoutComponent } from './common/layouts/main/header/header.component';
import { MainSideBarLayoutComponent } from './common/layouts/main/sidebar/sidebar.component';
import { MainLayoutComponent } from './common/layouts/main/main.component';
import { NotFoundComponent } from './common/pages/not-found/not-found.component';
import { CommonTableComponent } from './common/components/common-table/common-table.component';
import { CommonSpinnerComponent } from './common/components/common-spinner/common-spinner.component';
import { ValidationMessageComponent } from './common/components/validationmessage/validationmessage.component';
import { CommonService } from '@app/services/common/common.service';
import { ValidationUtil } from '@app/utilities/validation.util';

//Prime NG
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {
	DynamicDialogConfig,
	DynamicDialogModule,
	DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { SlideMenuModule } from 'primeng/slidemenu';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
// Services
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

import { NotSupportDeviceComponent } from './common/layouts/not-support-device/not-support-device.component';
import { AuthenticationLayoutComponent } from './common/layouts/authentication/authentication.component';
import { CommonGroupComponent } from './common/components/common-group/common-group.component';
import { CommonCitisComponent } from './common/components/common-citis/common-citis.component';
import { CommonAdvancedSearchComponent } from './common/components/common-advanced-search/common-advanced-search.component';
import { CommonRankComponent } from './common/components/common-rank/common-rank.component';
import { CommonCheckStatusComponent } from './common/components/common-check-status/common-check-status.component';
import { CommonMemberShipComponent } from './common/components/common-member-ship/common-member-ship.component';

const PrimeNGModule = [
	TableModule,
	SliderModule,
	ProgressBarModule,
	DropdownModule,
	MultiSelectModule,
	CalendarModule,
	InputTextModule,
	ButtonModule,
	DialogModule,
	ContextMenuModule,
	ToastModule,
	BadgeModule,
	AvatarModule,
	ConfirmDialogModule,
	DynamicDialogModule,
	DividerModule,
	TabViewModule,
	InputTextareaModule,
	PaginatorModule,
	MenuModule,
	SlideMenuModule,
	CardModule,
	ImageModule,
	FileUploadModule,
	CheckboxModule,
];

@NgModule({
	declarations: [
		/** Component Embedded In HTML */
		NotFoundComponent,
		EmptyLayoutComponent,
		AuthenticationLayoutComponent,
		MainSideBarLayoutComponent,
		MainHeaderLayoutComponent,
		MainFooterLayoutComponent,
		MainLayoutComponent,
		CommonTableComponent,
		CommonSpinnerComponent,
		ValidationMessageComponent,
		NotSupportDeviceComponent,
		CommonGroupComponent,
		CommonCitisComponent,
		CommonAdvancedSearchComponent,
		CommonRankComponent,
		CommonCheckStatusComponent,
		CommonMemberShipComponent,
		/******************************/

		RoundPipe,
		SafeContentPipe,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		AngularMaterialDataGridModule,
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,

		//PrimeNG
		PrimeNGModule,
	],
	exports: [
		RouterModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		AngularMaterialDataGridModule,
		/** Component Embedded In HTML */
		NotFoundComponent,
		EmptyLayoutComponent,
		MainSideBarLayoutComponent,
		MainHeaderLayoutComponent,
		MainFooterLayoutComponent,
		MainLayoutComponent,
		CommonTableComponent,
		CommonSpinnerComponent,
		ValidationMessageComponent,
		NotSupportDeviceComponent,
		CommonGroupComponent,
		CommonCitisComponent,
		CommonAdvancedSearchComponent,
		CommonRankComponent,
		CommonCheckStatusComponent,
		CommonMemberShipComponent,
		/******************************/
		PrimeNGModule,
	],
	entryComponents: [],
	providers: [
		MatDialog,
		CommonService,
		ValidationUtil,
		ToastrService,
		ConfirmationService,
		DialogService,
		DynamicDialogRef,
		DynamicDialogConfig,
	],
})
export class BaseModule {}
