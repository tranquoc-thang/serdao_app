import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '@app/views/base.component';
import { Title } from '@angular/platform-browser';
import { StringUtil } from '@app/utilities/string.util';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-authentication-layout',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationLayoutComponent{

	//Initialize Page
	constructor(
		_activatedRoute: ActivatedRoute,
		 _pageTitle: Title,
		 _router: Router,
		protected stringUtil: StringUtil,
		public _translateService: TranslateService,
	) {

	}

}
