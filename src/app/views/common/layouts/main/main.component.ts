import {
	Component,
	HostListener,
	OnInit,
	SimpleChanges,
	ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '@app/views/base.component';
import { Title } from '@angular/platform-browser';
import { StringUtil } from '@app/utilities/string.util';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainLayoutComponent {
	width: number = 1200;
	height!: number;
	activeWidth: number = 1200;

	searchValue = '';
	// searchName = '';
	// searchModel = "";

	@HostListener('window:resize', ['$event'])
	onResize($event: any) {
		this.width = $event.target.innerWidth;
		this.height = $event.target.innerHeight;
	}

	//Initialize Page
	constructor(
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		protected stringUtil: StringUtil
	) {}

	// searchNameTable(value: string) {
	// 	this.searchModel = value.trim();
	// }
	ngOnInit(): void {
		this.width = window.innerWidth;
	}

	checkDeviceIsSupported(): boolean {
		if (this.width >= this.activeWidth || !this.width) {
			return true;
		}

		return false;
	}
}
