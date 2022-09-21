export interface AdminForgotDto {
	adminAccount: string;
}
export interface AdminResetPasswordDto {
	adminAccount: string;
	adminOldPassword: string;
	adminNewPassword: string;
	pinCode: string;
}
