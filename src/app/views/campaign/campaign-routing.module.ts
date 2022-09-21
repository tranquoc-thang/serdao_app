import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { QrcodeHistoryListComponent } from './qrcode-history-list/qrcode-history-list.component';

const routes: Routes = [
	{
		path: 'campaign-list',
		component: CampaignListComponent,
		data: {
			listLabel: 'Danh sách chiến dịch',
		},
	},
	{
		path: 'packing-qr-history-list',
		component: QrcodeHistoryListComponent,
		data: {
			listLabel: 'Danh sách mã QR đã sử dụng',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CampaignRoutingModule {}
