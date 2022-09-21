import { Injectable } from '@angular/core';
import { UserAdminDto } from '@app/interfaces/dtos/user.dto';

@Injectable({
	providedIn: 'root',
})
export class GlobalProvider {
	public static adminInfo: UserAdminDto;
}
