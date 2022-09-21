import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Province } from '@app/interfaces/models/province.entity';
import { CommonService } from '@app/services/common/common.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

interface SelectedCity {
	provinceId: number;
	provinceName: string;
}

@Component({
	selector: 'app-common-citis',
	templateUrl: './common-citis.component.html',
	styleUrls: ['./common-citis.component.scss'],
})
export class CommonCitisComponent extends BaseComponent implements OnInit {
	provinceList!: Province[];
	province!: Province[];

	@Input() selectedProvince!: number | undefined;
	@Output() currentProvinces: EventEmitter<any> = new EventEmitter<any>();
	@Input() currentSelected!: any;
	@Input() isCustomerUpdation!: boolean;

	@Output() currentProvince: EventEmitter<Province> =
		new EventEmitter<Province>();

	@Output() currentSelectedProvince: EventEmitter<Province> =
		new EventEmitter<Province>();

	constructor(
		private commonService: CommonService,
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
		this.commonService.provinceSelection.subscribe((data) => {
			console.log('data', data);
			const newData = [
				{
					areaId: 0,
					provinceId: 0,
					provinceName: 'Chọn Tỉnh Thành',
					provinceNameOptional: '',
					provinceType: '',
					status: 9,
				},
				...data,
			];
			this.provinceList = newData;
		});
		console.log(this.selectedProvince);

	}

	getProvinces($event: any) {
		this.province = this.provinceList.filter(
			(province) => province.provinceId === $event.value
		);
		$event.provinceName = this.province[0].provinceName;
		this.currentProvinces.emit($event);
	}
	// getProvinceList() {
	// 	this.provinceList = this.commonService.getStorageProvince();
	// }

	emitCurrentProvinced(_event: any, city: Dropdown) {
		this.currentSelectedProvince.emit(city.selectedOption);
	}

	emitCurrentProvince($event: Province) {
		this.currentProvince.emit($event);
	}
}

// getProvinceList() {
// 	this.provinceList = this.commonService.getStorageProvince();
// }
// emitCurrentProvince($event: any) {
// 	this.currentProvince.emit(
// 		this.commonService.getStorageProvinceById($event.value)
// 	);
// }
