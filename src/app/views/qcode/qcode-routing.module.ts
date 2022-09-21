import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { QrcodeHistoryListComponent } from './qrcode-history-list/qrcode-history-list.component';
import { QrcodeListComponent } from './qrcode-list/qrcode-list.component';

const routes: Routes = [
	{
		path: 'packing-qr-list',
		component: QrcodeListComponent,
		data: {
			listLabel: 'Danh sách mã QR',
		},
	},
	// {
	// 	path: 'packing-qr-history-list',
	// 	component: QrcodeHistoryListComponent,
	// 	data: {
	// 		listLabel: 'Danh sách mã QR đã sử dụng',
	// 	},
	// },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class QcodeRoutingModule {}
