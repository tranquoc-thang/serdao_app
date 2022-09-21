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

@Component({
	selector: 'app-common-rank',
	templateUrl: './common-rank.component.html',
	styleUrls: ['./common-rank.component.scss'],
})
export class CommonRankComponent extends BaseComponent implements OnInit {
	rankList = [
		{
			id: 1,
			name: 'Hạng Đồng',
		},
		{
			id: 2,
			name: 'Hạng Bạc',
		},
		{
			id: 3,
			name: 'Hạng Vàng',
		},
		{
			id: 4,
			name: 'Hạng Bạch Kim',
		},
	];

	@Input() selectedRank!: number | undefined;

	@Output() currentRank: EventEmitter<any> = new EventEmitter<any>();

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

	ngOnInit() {}

	getRank($event: any) {
		this.currentRank.emit($event.value);
	}
}
