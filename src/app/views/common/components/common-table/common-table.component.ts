import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnsTableDto } from '@app/interfaces/dtos/columns-table.dto';
import { CommonService } from '@app/services/common/common.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';

@Component({
	selector: 'app-common-table',
	templateUrl: './common-table.component.html',
	styleUrls: ['./common-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonTableComponent extends BaseComponent {
	public selection!: any[];
	public avatar!: ColumnsTableDto;

	// Table props
	@Input() lists!: any[];
	@Input() columns!: ColumnsTableDto[];
	@Input() rowHover!: boolean;
	@Input() rows!: number;
	@Input() showCurrentPageReport!: boolean;
	@Input() rowsPerPageOptions!: number[];
	@Input() loading!: boolean;
	@Input() paginator!: boolean;
	@Input() currentPageReportTemplate!: string;
	@Input() globalFilterFields!: string[];
	@Input() filterDelay!: number;
	@Input() scrollable!: boolean;
	@Input() pageLinks!: number;
	@Input() dataKey!: string;
	@Input() totalRecords!: number;
	@Input() showRevertAction!: boolean;
	@Input() openDialog!: Function;

	// Custom props
	@Input() title!: string;
	@Input() expand!: boolean;
	@Input() service!: string;
	@Output() selectionData: EventEmitter<any[]> = new EventEmitter<any[]>();
	@Output() currentPage: EventEmitter<any> = new EventEmitter<{
		first: number;
		row: number;
	}>();

	//Confirm dialog
	public cancelLabel!: string;
	public confirmLabel!: string;

	//Event Action
	@Input() doDeleteCallback!: Function;
	@Input() doDeactiveCallback!: Function;
	@Input() doEditCallback!: Function;

	//Element Table
	@ViewChild('dt') table!: Table;

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
		this.initializeTable();
	}

	public initializeTable(): void {
		this.cancelLabel = this._translateService.instant(
			'common.buttons.cancel'
		);
		this.confirmLabel = this._translateService.instant('common.buttons.ok');
	}

	filterData($event?: any): void {
		this.table.filterGlobal($event.target.value, 'contains');
	}

	onPageEmit($event?: any) {
		this.currentPage.emit($event);
	}

	onRowSelectEmit($event?: any) {
		this.selectionData.emit(this.selection);
	}
}
