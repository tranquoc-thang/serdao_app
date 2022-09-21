import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRequestingListComponent } from './customer-requesting-list/customer-requesting-list.component';
import { CustomerNewComponent } from './customer-new/customer-new.component';

const routes: Routes = [
	{
		path: '',
		component: CustomerListComponent,
		data: {
			listLabel: 'Danh sách khách hàng',
		},
	},
	{
		path: 'requesting',
		component: CustomerRequestingListComponent,
		data: {
			listLabel: 'Danh sách khách hàng yêu cầu cập nhật thông tin',
		},
	},
	{
		path: 'new',
		component: CustomerNewComponent,
		data: {
			listLabel: 'Danh sách khách hàng mới',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CustomerRoutingModule {}
