//Import System Library
import {
	Component,
	OnInit,
	OnDestroy,
	ElementRef,
	ViewChild,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';

import { Location } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import {
	AbstractControl,
	FormControl,
	FormGroupDirective,
	FormBuilder,
	FormGroup,
	NgForm,
	Validators,
} from '@angular/forms';

import { BaseComponent } from '@views/base.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@app/services/common/common.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { ToastrService } from 'ngx-toastr';
import { StringUtil } from '@utilities/string.util';
import { DialogService } from 'primeng/dynamicdialog';

// import { GoogleAnalyticsProvider } from '@providers/google-analytics.provider';
@Component({
	selector: 'common-validation-message',
	templateUrl: './validationmessage.component.html',
	styleUrls: ['./validationmessage.component.scss'],
})
export class ValidationMessageComponent extends BaseComponent {
	@Input('mainForm') mainForm!: FormGroup;
	@Input('controllerName') controllerName!: string;
	@Input('controllerTitle') controllerTitle!: string;
	@Input('controllerType') controllerType!: string;

	@Input('controllerMatchTitle') controllerMatchTitle!: string;

	@Input('maxLength') maxLength!: string;
	@Input('minLength') minLength!: string;
	@Input('exactlyLength') exactlyLength!: string;

	//Initialize Page
	constructor(
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		_validate: ValidationUtil,
		_toast: ToastrService,
		public stringUtil: StringUtil,
		_translateService: TranslateService,
		_dialog: DialogService
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
}
