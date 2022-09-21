import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StringUtil } from '@app/utilities/string.util';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-not-support-device',
	templateUrl: './not-support-device.component.html',
	styleUrls: ['./not-support-device.component.scss'],
})
export class NotSupportDeviceComponent implements OnInit {
	//Initialize Page
	constructor(
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		protected stringUtil: StringUtil,
		public _translateService: TranslateService
	) {}

	ngOnInit(): void {}
}
