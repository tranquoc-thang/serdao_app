import { Pipe, PipeTransform } from '@angular/core';
import { MemberShip } from '@app/interfaces/models/member-ship.entity';

const rankList = [
	{
		id: 1,
		name: 'Zeit Thân Thiết',
	},
	{
		id: 2,
		name: 'test update',
	},
	{
		id: 3,
		name: 'Zeit Tâm Giao',
	},
	{
		id: 4,
		name: 'Zeit Tri Kỷ',
	},
	{
		id: 5,
		name: 'Zeit Tiềm Năng',
	},
	{
		id: 6,
		name: 'Zeit Tài Năng',
	},
	{
		id: 7,
		name: 'Zeit Chuyên Gia',
	},
	{
		id: 8,
		name: 'Zeit Ngoại Hạng',
	},
];

@Pipe({
	name: 'toMemberShip',
})
export class ToMemberShipPipe implements PipeTransform {
	transform(value: number): string {
		const rank = rankList.filter((r) => r.id == value).map((r) => r.name);
		return rank.length > 0 ? rank[0] : 'Chưa Có Hạng';
	}
}
