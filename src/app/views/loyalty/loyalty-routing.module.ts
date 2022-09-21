import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoyaltyGiftExchangeComponent } from './loyalty-gift-exchange/loyalty-gift-exchange.component';
import { LoyaltyGiftListComponent } from './loyalty-gift-list/loyalty-gift-list.component';
import { LoyaltyRuleComponent } from './loyalty-rule/loyalty-rule.component';
import { QrcodeHistoryListComponent } from './qrcode-history-list/qrcode-history-list.component';

const routes: Routes = [
	{
		path: 'loyalty-rule',
		component: LoyaltyRuleComponent,
		data: {
			listLabel: 'Quy Luật',
		},
	},
	{
		path: 'loyalty-gift-list',
		component: LoyaltyGiftListComponent,
		data: {
			listLabel: 'Danh Sách Quà Tặng',
		},
	},
	{
		path: 'loyalty-gift-exchange-manager',
		component: LoyaltyGiftExchangeComponent,
		data: {
			listLabel: 'Quản Lý Đổi Quà',
		},
	},
	{
        path:'qrcode-history-list',
        component:QrcodeHistoryListComponent,
        data:{
            listLabel:'Danh Sách Mã Qr Đã Sử Dụng',
        },
    },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoyaltyRoutingModule {}
