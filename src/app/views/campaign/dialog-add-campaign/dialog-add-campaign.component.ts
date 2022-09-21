import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CampaignService } from './../../../services/campaign/campaign.service';
import { CampaignCreateDto } from './../../../interfaces/dtos/campaign.dto';
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
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-dialog-add-campaign',
  templateUrl: './dialog-add-campaign.component.html',
  styleUrls: ['./dialog-add-campaign.component.scss'],
})
export class DialogAddCampaignComponent
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
    private campaignService: CampaignService,
    public formBuilder: FormBuilder,
    private _ref: DynamicDialogRef,
    private primeConfig: PrimeNGConfig,
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
  campaignsTypeList!: {}[];
  campaignAddForm!: FormGroup;
  provinceList!: Province[];
  displayModal!: boolean;
  currentProvince!: Province | null;

  currentSex!: number;
  currentFoundingDate!: string;
  currentGroup!: string;
  campaignType!: string;
  currentBirthday!: string;
  activationEmailStatus: boolean = false;
  currentFile!: string;
  currentFileBanner!: File;
  currentFileThumbnail!: File;
  fileUndefined !: File;
  ngOnInit(): void {
    this.campaignsTypeList = [
      {
        campaignNo: 1,
        campaignType: 'Chiến Dịch 1',
      },
      {
        campaignNo: 2,
        campaignType: 'Chiến Dịch 2',
      },
      {
        campaignNo: 3,
        campaignType: 'Chiến Dịch 3',
      },
    ];
    this._translateService
      .get('primeng')
      .subscribe((res) => this.primeConfig.setTranslation(res));
    this.campaignAddForm = this.formBuilder.group({
      campaignStartDate: [
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
      campaignEndDate: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      campaignRedemptionEndDate: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      campaignTitle: [
        '',
        {
          validators: [Validators.maxLength(500), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      campaignGiftsLimit: [
        '',
        {
          validators: [Validators.maxLength(50), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      campaignRedemptionMethodDescription: [
        '',
        {
          validators: [Validators.maxLength(500), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      campaignDescription: [
        '',
        {
          validators: [Validators.maxLength(500), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      campaignGeneralRulesDescription: [
        '',
        {
          validators: [Validators.maxLength(500), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
    });
  }


  onCreateNewCampaign() {

    const formData = new FormData()

    formData.append('campaignStartDate', this.campaignAddForm.value.campaignStartDate)
    formData.append('campaignEndDate', this.campaignAddForm.value.campaignEndDate)
    formData.append('campaignRedemptionEndDate', this.campaignAddForm.value.campaignRedemptionEndDate)
    formData.append('campaignType', this.campaignType)
    formData.append('campaignGroupId', this.currentGroup)
    formData.append('campaignTitle', this.campaignAddForm.value.campaignTitle)
    formData.append('campaignGiftsLimit', this.campaignAddForm.value.campaignGiftsLimit)
    formData.append('campaignDescription', this.campaignAddForm.value.campaignDescription)
    formData.append('campaignRedemptionMethodDescription', this.campaignAddForm.value.campaignRedemptionMethodDescription)
    formData.append('campaignGeneralRulesDescription', this.campaignAddForm.value.campaignGeneralRulesDescription)
    formData.append('campaignBanner', this.currentFileBanner)
    formData.append('campaignThumbnail', this.currentFileThumbnail)

    this.campaignService.createCampaign(formData)?.subscribe(
      (res: any) => {

        if (res.type === HttpEventType.UploadProgress) {
          // do something
        } else if (res instanceof HttpResponse) {
          let result = res.body
          console.log(result)
          if (result.responseStatus === 200) {
            this.presentToast(
              EToastType.success,
              this._translateService.instant(result.content.message)
            );
            // this._ref.close();
          } else if (result.responseStatus === 417) {
            this.presentToast(
              EToastType.warning,
              this._translateService.instant(result.content.message)
            );
          } else {
            console.log(result);
            this.presentToast(
              EToastType.error,
              this._translateService.instant(
                'common.errors-message.common-server-error'
              )
            );
          }
        }
      },
      (error) => {
        console.log(error);
        this.presentToast(
          EToastType.error,
          this._translateService.instant(
            'common.errors-message.common-server-error'
          )
        );
      }
    )
  }


  get email() {
    return this.campaignAddForm.get('email');
  }

  getDate($event: any) {
    // this.currentBirthday = $event.value;
    let d = new Date(Date.parse($event));
    this.currentBirthday = `${d.getFullYear()}/${d.getMonth() + 1
      }/${d.getDate()}`;
  }

  getGroup($event: any) {
    this.currentGroup = $event.groupId;
    console.log(this.currentGroup)
  }

  getSex($event: any) {
    this.currentSex = $event;
  }

  getProvince($event: Province) {
    this.currentProvince = $event;
  }

  isDisable(): boolean {
    return this.campaignAddForm.valid;
  }

  getCampaignType($event: any) {
    this.campaignType = $event.value
  }

  onSelectEvent($event: any) {
    console.log($event);

    this.currentFile = $event;
  }

  onSelectBanner($event: any) {
    // this.currentFileFront = $event.currentFiles[0];
    let selectedFiles: FileList = $event.files;
    this.currentFileBanner = selectedFiles[0];
    console.log(this.currentFileBanner);
  }

  onSelectThumbnail($event: any) {
    // this.currentFileFront = $event.currentFiles[0];
    let selectedFiles: FileList = $event.files;
    this.currentFileThumbnail = selectedFiles[0];
    console.log(this.currentFileThumbnail);
  }

  onRemoveBanner($event: any) {
    this.currentFileBanner = this.fileUndefined;
    console.log(this.currentFileBanner);
  }

  onRemoveThumbnail($event: any) {
    this.currentFileThumbnail = this.fileUndefined;
    console.log(this.currentFileThumbnail);
  }
  
}
