export interface CommonRequests {
	entity?: Object;
	filters?: Array<any>;
	page: number;
	perPage: number;
	sort?:
		| String
		| null
		| {
				filedName: String;
				sortType: String;
		  };
	sortField?: String | null;
}
