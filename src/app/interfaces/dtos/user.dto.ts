export interface UserLoginDto {
	adminAccount: string;
	adminPassword: string;
}

export interface UserAdminDto {
	adminAccount: string;
	adminEmail: string;
	adminFullName: string;
	adminAuthId: string;
	adminAuthName: string;
	adminAccessToken: string;
	adminRefreshToken: string;
	admineAccessTokenExpiredDate: Date;
}
