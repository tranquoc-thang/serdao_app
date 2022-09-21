export interface CampaignDto {
	campaignId: number;
	campaignType: number;
	campaignGroupId: number;
	campaignTitle: String;
	campaignDescription: String;
	campaignThumbnail: String;
	campaignBanner: String;
	campaignRedemptionMethodDescription: String;
	campaignGeneralRulesDescription: String;
	campaignStartDate: String;
	campaignEndDate: String;
	campaignRedemptionEndDate: String;
	campaignGiftsLimit: number;
	campaignGiftCurrentTotal: number;
	campaignStatus: number;
	createdDate: String;
	createdUser: number;
	updatedDate: String | null;
	updatedUser: number | null;
	status: number;
}
export interface GetPackingRequest {
	page: number;
	itemPerPage: String;
	productId: number;
}
export interface CampaignRules {
	campaignId: number,
	productId: number,
	productPoint: number,
	createdDate: String,
	createdUser: number,
	updatedDate: String | null,
	updatedUser: String | null,
	status: number
}
export interface CampaignProvinces {
	campaignId: number,
	provinceId: number,
	status: number
}

export interface CampaignProvincesUpdate {
	provincesList: string;
}


export interface CampaignGifts {
	giftId: number,
	giftType: number,
	giftLimit: number,
	giftCurrentLimit: number,
	campaignId: number,
	giftRequiredPoint: number,
	giftQuantity: number,
	giftTitle: String,
	giftDescription: String,
	giftIcon: String,
	giftThumbnail: String,
	giftBanner: String,
	giftEndDate: String,
	createdDate: String,
	createdUser: number,
	updatedDate: String | null,
	updatedUser: String | null,
	status: number
}
export interface CampaignSearch {
	page: number;
	itemPerPage: String;
	campaignType: number;
	groupId: number;
	campaignTitle: String;
}
export interface CampaignCreateDto {
	campaignStartDate: String;
	campaignEndDate: String;
	campaignRedemptionEndDate: String;
	campaignType: number;
	campaignGroupId: number;
	campaignTitle?: String;
	campaignGiftsLimit: string;
	campaignDescription: string;
	campaignRedemptionMethodDescription: string;
	campaignGeneralRulesDescription: string;
	campaignThumbnail: File;
	campaignBanner: File;
}

export interface CampaignRule {
	productId: number,
	productPoint: number
	campaignTitle: String;
	campaignGiftsLimit: number;
	campaignDescription: String;
	campaignRedemptionMethodDescription: String;
	campaignGeneralRulesDescription: String;
	campaignThumbnail: File;
	campaignBanner: File;
}

export interface CampaignV1Rule {
	productId: number,
	productPoint: number
}


