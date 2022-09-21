interface ExchangeGift {
	gift_id: number;
	customer_id: number;
	campaign_id: number;
	gift_type: number;
	recipient_phone: number;
	recipient_address: string;
	recipient_province_id?: number;
	recipient_province_name: string;
	exchange_date: Date;
	exchange_status: number;
	exchange_note: string;
	gift_limit: number;
	gift_current_limit: number;
	gift_required_point: number;
	gift_title: string;
	gift_description: string;
	gift_icon: string;
	gift_thumbnail: string;
	gift_banner: string;
	gift_end_date: Date;
}

interface Customer {
	customer_no: number;
	customer_phone: number;
	customer_email: string;
	customer_avatar: string;
	customer_name: string;
	customer_verified: number;
	customer_required_change: number;
	customer_membership_total_point: number;
	customer_membership_current_point: number;
	created_date: Date;
	created_user: number;
	updated_date: Date;
	updated_user: number;
	status: number;
}

interface GiftExchangeSearch {
	page: number;
	customerNo: string;
	recipientPhone: string;
	recipientAddress: string;
	recipientProvinceId?: number;
}

type ExchangeGiftResponse = ExchangeGift & Customer;

export { ExchangeGiftResponse, GiftExchangeSearch };
