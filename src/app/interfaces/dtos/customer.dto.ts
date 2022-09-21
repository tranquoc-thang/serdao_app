export interface CustomerDto {
	groupId: number;
	groupName: string;
	groupNameOptional: string;
	membershipId: number;
	membershipClass: string;
	membershipNextId: number;
	membershipNextClass: string;
	customerId: number;
	customerNo: string;
	customerPhone: string;
	customerEmail: string;
	customerAvatar: string;
	customerName: string;
	customerVerified: number;
	customerRequiredChange: number;
	customerMembershipTotalPoint: number;
	customerMembershipCurrentPoint: number;
	customerBirthday: string;
	customerIdentification: string;
	customerIdentificationFront: string;
	customerIdentificationBack: string;
	companyName: string;
	customerAddress: string;
	provinceId: number;
	provinceName: string;
	createdDate: Date;
	status: number;
}

export interface CustomerCreateDto {
	customerPhone: number;
	customerEmail: string;
	// customerPassword: string;
	customerGroup: number;
	customerName: string;
	customerIdentification: number;
	customerBirthday: string;
	customerAddress: string;
	customerProvinceName?: string;
	customerProvinceId?: number;
	customerIdentificationFront: string;
	customerIdentificationBack: string;
	companyName: string;
}

export interface CustomerUpdateDto {
	customerName: string;
	customerIdentification: string;
	customerBirthday: string;
	customerAddress: string;
	provinceName?: string;
	provinceId?: number;
	companyName: string;
}

export interface CustomerSearch {
	page: number;
	itemPerPage: String;
	groupId?: number;
	membershipId: number;
	provinceId?: number;
	customerIdentification: string;
	customerName: string;
	customerPhone: string;
	customerNo: string;
	customerEmail: string;
	companyName: string;
	customerAddress: string;
}

export interface CustomerUpdate {
	customerPhone: string;
	customerEmail: string;
	customerName: string;
	customerIdentification: string;
	customerBirthday: string;
	customerAddress: string;
	customerProvinceName?: string;
	customerProvinceId?: number;
	customerIdentificationFront: File;
	customerIdentificationBack: File;
	companyName: string;
}
export interface CustomerRequestingUpdationSearch {
	page: number;
	itemPerPage: String;
	groupId?: number;
	provinceId?: number;
	customerIdentification: string;
	customerName: string;
	customerPhone: string;
	customerNo: string;
	customerEmail: string;
	companyName: string;
	customerAddress: string;
}
