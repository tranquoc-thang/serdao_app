//Import System Library
import {Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
	ActivatedRoute,
	Router
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from '@views/base.component';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent{
	//Initialize Page
	constructor(
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_translateService: TranslateService
	) {

	}
}
