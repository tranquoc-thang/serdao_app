export interface Gift {
    giftId:number;
	giftType: number;
	giftIcon: string;
    giftThumbnail:string;
    giftBanner:string;
	giftTitle:string;
    giftDescription:string;
    giftCurrentLimit:number;
    createdDate:string;
    createdUser:number;
    updatedDate:string;
    updatedUser:string;
    status:number;
    giftLimit:number;
    membershipId:number;
    giftRequiredPoint:number;
    giftStartDate:string;
    giftEndDate:string;
}

export interface AddGiftRequest{
    giftStartDate:string;
    giftEndDate:string;
    giftLimitedQuanlity:number;
    giftRequiredPoint:number;
    giftTitle:string;
    giftDescription:string;
    giftThumbnail:File;
    giftIcon:File;
    giftBanner:File;
    
}

export interface LoyaltyMembership{
    membershipId:number;
    membershipType:number;
    membershipNextId:number;
    membershipClass:string;
    membershipPoint:number;
    membershipDescription:string;
    createdUser:number;
    createdDate:string;
    updatedUser:string
    updatedDate: string,
    status:number

}
export interface GetPackingRequest {
	page: number;
	itemPerPage: String;
	productId: number;
}
