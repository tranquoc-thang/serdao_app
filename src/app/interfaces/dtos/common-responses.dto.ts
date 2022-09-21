export interface CommonResponses {
	responseStatus: number;

	statusText: String;

	timestamp: {
		date: Date;
		timezone_type: number;
		timezone: string;
	};

	content: {
		message: string;
		datas: any
	};
}
