export interface QrPackingDto {
	productId: String;
	productSlug: String;
	productDimensions: String;
	productPackagingType: String;
	productPackedQuantity: number;
	productLoyaltyPoints: number;
	productRetailerQrcodeQuantity: number;
	productRetailerQrcodePoint: number;
	productInstallerQrcodeQuantity: number;
	productInstallerQrcodePoint: number;
	productNote: String;
	packingId: number;
	productUnit: String;
	packingDate: String;
	packingExpirationDate: String;
	packingPdfUrl: String;
	packingType: String;
	packingQuantity: number;
	packingLoyaltyPoints: number;
	packingRetailerQrcodeQuantity: number;
	packingRetailerQrcodePoint: number;
	packingInstallerQrcodeQuantity: number;
	packingInstallerQrcodePoint: number;
	createdDate: String;
	status: number;
}

export interface GetPackingRequest {
	page: number;
	itemPerPage: String;
	productId: number;
}

export interface AddPackingRequest {
	productId: number;
	quantity: number;
	packagingDate:Date;
}

export interface QrHistoryDto {
	qrCode: String;
	packingId: number;
	productId: number;
	qrType: number;
	qrUrl: String;
	qrPoint: number;
	qrProductQuantity: number;
	qrStatus: number;
	qrUsedDate: String;
	qrUsedUser: number;
	customerNo: String;
	status: number;
}
export interface QrcodeSearch {
	page: number;
	itemPerPage: String;
	customerNo: String;
	productId: number;
	groupId:number;
	qrUsedDate:String;
	qrCode: String;
}

