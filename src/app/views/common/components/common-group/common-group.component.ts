import { Dropdown } from 'primeng/dropdown';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupList } from '@app/interfaces/models/group.entity';
import { CommonService } from '@app/services/common/common.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-common-group',
	templateUrl: './common-group.component.html',
	styleUrls: ['./common-group.component.scss'],
})
export class CommonGroupComponent extends BaseComponent implements OnInit {
	groupList!: GroupList[];
	//props
	@Input() selectedGroup!: number | undefined;

	@Output() currentGroup: EventEmitter<GroupList> =
		new EventEmitter<GroupList>();
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
		this._common.groupSelection.subscribe((data) => {
			const newData: GroupList[] = [
				{
					createdDate: new Date(),
					createdUser: 900000000010,
					groupDescription: '',
					groupId: 0,
					groupName: 'Đại Lý | Thầu Thợ',
					groupNameOptional: '',
					status: 9,
					updatedDate: new Date(),
					updatedUser: 0,
				},
				...data,
			];
			this.groupList = newData;
		});
	}

	getGroup(_event: any, group: Dropdown) {
		this.currentGroup.emit(group.selectedOption);
	}

	getGroups($event: any) {
		this.currentGroups.emit($event.value);
	}
}
