import { Component, Inject, OnInit, Optional, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { CampaignGifts } from '@app/interfaces/dtos/campaign.dto';
import { CustomerCreateDto } from '@app/interfaces/dtos/customer.dto';
import { Province } from '@app/interfaces/models/province.entity';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-dialog-edit-quarterly-gift',
  templateUrl: './dialog-edit-quarterly-gift.component.html',
  styleUrls: ['./dialog-edit-quarterly-gift.component.scss'],
  providers: [DialogService]
})
export class DialogEditQuarterlyGiftComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    _activatedRoute: ActivatedRoute,
    _pageTitle: Title,
    _router: Router,
    _materialDialog: MatDialog,
    _common: CommonService,
    _validate: ValidationUtil,
    _toast: ToastrService,
    _dialog: DialogService,
    _translateService: TranslateService,
    private customerService: CustomerService,
    public formBuilder: FormBuilder,
    private _ref: DynamicDialogRef,
    private primeConfig: PrimeNGConfig,
    private commonService: CommonService,
    public config: DynamicDialogConfig
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

  campaignQuarterlyGift!: FormGroup;
  campaignEditTabForm2!: FormGroup;
  accumulatePointsRuleForm2!: FormGroup;
  accumulatePointsRuleForm!: FormGroup;
  ruleList!: {}[];
  giftList!: {}[];
  provinceList!: Province[];
  provinceListS!: Province[];
  provinceListC!: Province[];
  provinceListN!: Province[];
  displayModal!: boolean;
  currentProvince!: Province | null;
  currentFileFront!: File;
  currentSex!: number;
  currentFoundingDate!: string;
  currentGroup!: number;
  currentBirthday!: string;
  activationEmailStatus: boolean = false;
  currentFile!: string;
  gift!: CampaignGifts;
  ngOnInit(): void {
    this.gift = this.config.data.gift;
    this._translateService
      .get('primeng')
      .subscribe((res) => this.primeConfig.setTranslation(res));
    this.campaignQuarterlyGift = this.formBuilder.group({
      pointExchangeQuarterly: [
        '',
        {
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
      ],
      giftExchangeTitle: [
        '',
        {
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
      ],
      quantityExchangeLimit: [
        '',
        {
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
      ],
      description: [
        '',
        {
					validators: [],
					asyncValidators: [],
					updateOn: 'change',
				},
      ],
    });
    this.campaignEditTabForm2 = this.formBuilder.group({
      txtStartDate: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [
            // this._validate.emailExistingValidator('cd', 'cm', true),
          ],
          updateOn: 'change',
        },
      ],
      txtEndDate: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtEndDateGift: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtCampaignTitle: [
        '',
        {
          validators: [Validators.maxLength(500), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtMaxGift: [
        '',
        {
          validators: [Validators.maxLength(50), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
    });
    this.accumulatePointsRuleForm = this.formBuilder.group({
      txtStartDate: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [
            // this._validate.emailExistingValidator('cd', 'cm', true),
          ],
          updateOn: 'change',
        },
      ],
      txtEndDate: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtEndDateGift: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtpointProduct: [
        '',
        {
          validators: [Validators.maxLength(500), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtMaxGift: [
        '',
        {
          validators: [Validators.maxLength(50), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
    });
    this.accumulatePointsRuleForm2 = this.formBuilder.group({
      txtStartDate: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [
            // this._validate.emailExistingValidator('cd', 'cm', true),
          ],
          updateOn: 'change',
        },
      ],
      txtEndDate: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtEndDateGift: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtpointProduct: [
        '',
        {
          validators: [Validators.maxLength(500), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtMaxGift: [
        '',
        {
          validators: [Validators.maxLength(50), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
    });
  }
  getDate($event: any) {
    // this.currentBirthday = $event.value;
    let d = new Date(Date.parse($event));
    this.currentBirthday = `${d.getFullYear()}/${d.getMonth() + 1
      }/${d.getDate()}`;
  }

  getGroup($event: any) {
    this.currentGroup = $event;
  }

  getSex($event: any) {
    this.currentSex = $event;
  }

  getProvince($event: Province) {
    this.currentProvince = $event;
  }

  onSelectEvent($event: any) {
    console.log($event);

    this.currentFile = $event;
  }
  checkAll(){
    $('group1').addClass('checked');
  }
  onSelectFront($event: any) {
		this.currentFileFront = $event.currentFiles[0];
	}
}
