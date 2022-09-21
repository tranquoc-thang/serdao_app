export interface CompanyDto {
	companyId: string;
	companyEmail: string;
	companyName: string;
	companyAvatar?: string;
	ownerFirstName: string;
	ownerLastName?: string;
	ownerKanaFirstName?: string;
	ownerKanaLastName?: string;
	companyNumberOfEmployee: number;
	ownerBirthday?: string;
	ownerPhone?: string;
	companyTypeOfBusiness?: number;
	ownerSex?: number;
	companyFoundingDate?: string;
	provinceId?: number;
	provinceName?: string;
	companyAddress: string;
	companyPostalCode: number;
	cityId?: number;
	cityName?: string;
	groupId?: number;
	companyVerified?: number;
	createdDate?: Date;
	status?: number;
	sendActivationStatus: number;
}

export interface CompanyRegisterDto {
	companyEmail: string;
	companyAvatar: string;
	companyName: string;
	companyOwnerFirstName: string;
	companyOwnerLastName: string;
	companyOwnerBirthday?: string;
	companyOwnerPhone?: string;
}

export interface CompanyGetListDto {
	entity: Object;
	filters: [];
	page: number;
	perPage: number;
	sort: any;
	sortField: any;
}

export interface CompanyGetDetailDto {
	companyId: string;
	companyEmail: string;
	companyName: string;
	companyOwnerFirstName: string;
	companyOwnerLastName: string;
	companyOwnerKanaFirstName: string;
	companyOwnerKanaLastName: string;
	companyOwnerBirthday: string;
	companyOwnerPhone?: string;
	companyOwnerSex: number;
	companyTypeOfBusiness: number;
	companyBusinessType?: number;
	createdDate?: string;
	companyFoundingDate: string;
	companyNumberOfEmployees: number;
	companyAddress: string;
	companyPostalCode: number;
	provinceId?: number;
	provinceName?: string;
	cityId?: number;
	cityName?: string;
}
export interface CompanyUpdateDto {
	companyId: string;
	newCompany: CompanyDto;
}
