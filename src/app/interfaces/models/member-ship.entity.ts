export interface MemberShip {
	membershipId: number;
	membershipType: number;
	membershipNextId: number;
	membershipClass: string;
	membershipPoint: number;
	membershipDescription: string;
	createdUser: number;
	createdDate: Date;
	updatedUser: number;
	updatedDate: Date;
	status: number;
}
