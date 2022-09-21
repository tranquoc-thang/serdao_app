export interface ProductDto {
	productId: number;
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
	createdDate: String;
	createdUser: number;
	updatedDate: String;
	updatedUser: number;
	status: number;
	productName: String;
	productDescription: String;
}
