import { Dropdown } from 'primeng/dropdown';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@app/services/common/common.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { MemberShip } from '@app/interfaces/models/member-ship.entity';

@Component({
	selector: 'app-common-member-ship',
	templateUrl: './common-member-ship.component.html',
	styleUrls: ['./common-member-ship.component.scss'],
})
export class CommonMemberShipComponent extends BaseComponent implements OnInit {
	memberList!: MemberShip[];
	//props
	@Input() selectedMember!: number | undefined;

	@Output() currentMember: EventEmitter<MemberShip> =
		new EventEmitter<MemberShip>();
	@Output() currentGroups: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		_validate: ValidationUtil,
		_toast: ToastrService,
		_dialog: DialogService,
		_translateService: TranslateService
	) {
		super(
			_activatedRoute,
			_pageTitle,
			_router,
			_materialDialog,
			_common,
			_validate,
			_toast,
			_translateService,
			_dialog
		);
	}
	ngOnInit(): void {
		this._common.memberSelection.subscribe((data) => {
			const newData: MemberShip[] = [
				{
					membershipId: 0,
					membershipType: 0,
					membershipNextId: 0,
					membershipClass: 'Chọn Hạng',
					membershipPoint: 0,
					membershipDescription: '',
					createdUser: 900000000010,
					createdDate: new Date(),
					updatedUser: 0,
					updatedDate: new Date(),
					status: 9,
				},
				...data,
			];
			this.memberList = newData;
		});
	}

	getGroup(_event: any, member: Dropdown) {
		this.currentMember.emit(member.selectedOption);
	}

	getGroups($event: any) {
		this.currentGroups.emit($event.value);
	}
}
