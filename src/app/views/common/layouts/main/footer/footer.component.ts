import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '@app/views/base.component';
import { Title } from '@angular/platform-browser';
import { StringUtil } from '@app/utilities/string.util';

@Component({
	selector: 'app-main-footer-layout',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class MainFooterLayoutComponent{

	//Initialize Page
	constructor(
		_activatedRoute: ActivatedRoute,
		 _pageTitle: Title,
		 _router: Router,
		protected stringUtil: StringUtil,
	) {

	}

}
