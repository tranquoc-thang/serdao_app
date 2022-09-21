export interface RecruitmentGetListDto {
	entity: Object;
	filters: [];
	page: number;
	perPage: number;
	sort: any;
	sortField: any;
}
export interface RecruitmentDto {
	companyId: number;
	companyName: string;
	careerSlug: string;
	careerId: number;
	jobId: number;
	jobSlug: string;
	provinceId: number;
	provinceName: string;
	cityId: number;
	cityName: string;
	jobHotStatus: number;
	jobTopStatus: number;
	createdDate: Date;
	updatedDate: Date;
	status: number;
	visibility: number;
	careerName: string;
	careerDescription: string;
}
