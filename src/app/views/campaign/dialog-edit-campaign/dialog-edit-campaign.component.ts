import { CampaignDto, CampaignRules, CampaignGifts, CampaignProvinces, CampaignV1Rule } from './../../../interfaces/dtos/campaign.dto';
import { CampaignService } from './../../../services/campaign/campaign.service';
import { DialogAddQuarterlyGiftComponent } from './dialog-add-quarterly-gift/dialog-add-quarterly-gift.component';
import { DialogEditQuarterlyGiftComponent } from './dialog-edit-quarterly-gift/dialog-edit-quarterly-gift.component';
import { DialogEditMonthlyGiftComponent } from './dialog-edit-monthly-gift/dialog-edit-monthly-gift.component';
import { Component, Inject, OnInit, Optional, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DialogEditSpecialGiftComponent } from './dialog-edit-special-gift/dialog-edit-special-gift.component';
import { DialogAddSpecialGiftComponent } from './dialog-add-special-gift/dialog-add-special-gift.component';
import { ProductDto } from '@app/interfaces/dtos/product.dto';
import { forkJoin } from 'rxjs';
import { QrCodeService } from '@app/services/qrcode/qrcode.service';
import { delay } from 'rxjs/operators';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-dialog-edit-campaign',
  templateUrl: './dialog-edit-campaign.component.html',
  styleUrls: ['./dialog-edit-campaign.component.scss'],
  providers: [DialogService]
})
export class DialogEditCampaignComponent
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
    public config: DynamicDialogConfig,
    public campaignService: CampaignService,
    public qrcodeService: QrCodeService,
    public _confirmationService: ConfirmationService,
    // private dialogRef: MatDialogRef<DialogEditCampaignComponent>
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

  campaignEditTabForm!: FormGroup;
  campaignEditTabForm2!: FormGroup;
  accumulatePointsRuleForm2!: FormGroup;
  accumulatePointsRuleForm!: FormGroup;
  subjectList!: {}[];
  provinceList!: Province[];
  provinceListS!: Province[];
  provinceListC!: Province[];
  provinceListN!: Province[];
  displayModal!: boolean;
  currentProvince!: Province | null;
  productList!: ProductDto[];
  currentSex!: number;
  currentFoundingDate!: string;
  currentGroup!: number;
  currentBirthday!: string;
  activationEmailStatus: boolean = false;
  currentFile!: string;
  campaignID!: number;
  campaignType!: number;
  campaignDetail!: CampaignDto;
  campaignRules!: CampaignRules[];
  campaignMonthlyGift!: CampaignGifts[];
  campaignSessionGift!: CampaignGifts[];
  campaignEndGift!: CampaignGifts[];
  currentFileFront!: File;
  currentFileBack!: File;
  campaignProvinces!: CampaignProvinces[];
  currentRoute!: string;
  currentFileBanner!: File;
  currentFileThumbnail!: File;
  campaignImgThumbnail!: any;
  campaignImgBanner!: any;
  campaignStartDate!: Date;
  campaignEndDate!: Date;
  campaignRedemptionEndDate!: Date;
  fileUndefined!: File;
  productId!: number;
  productPoint!: number;
  currentStartDate!: string;
  currentEndDate!: string;
  currentRedemptionEndDate!: string;
  ngOnInit(): void {
    this.campaignID = this.config.data.campaignID;
    this.campaignType = this.config.data.campaignType;
    this.doGetCampaignDetail(this.campaignID, this.campaignType);
    this.initializePage();
    this.subjectList = [
      {
        groupId: 0,
        groupName: 'Đại Lý | Thầu Thợ',
      },
      {
        groupId: 1,
        groupName: 'Đại Lý',
      },
      {
        groupId: 2,
        groupName: 'Thầu Thợ',
      },
    ];
    this._translateService
      .get('primeng')
      .subscribe((res) => this.primeConfig.setTranslation(res));
    this.campaignEditTabForm = this.formBuilder.group({
      txtStartDate: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtEndDate: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtEndDateGift: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtCampaignTitle: [
        '',
        {
          validators: [Validators.maxLength(150), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtCampaignDescription: [
        '',
        {
          validators: [Validators.maxLength(2000), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtCampaignGeneralRulesDescription: [
        '',
        {
          validators: [Validators.maxLength(2000), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtCampaignRedemptionMethodDescription: [
        '',
        {
          validators: [Validators.maxLength(2000), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtAmountGiftChanged: [
        '',
        {
          validators: [Validators.maxLength(20), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtMaxGiftCampaign: [
        '',
        {
          validators: [Validators.maxLength(20), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtCampaignType: [
        '',
        {
          validators: [Validators.maxLength(20), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      campaignGroupId: [
        '',
        {
          validators: [Validators.maxLength(20), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtMaxGift: [
        '',
        {
          validators: [Validators.maxLength(20), Validators.required],
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
      campaignGroupId: [
        '',
        {
          validators: [Validators.maxLength(500), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtMaxGiftCampaign: [
        '',
        {
          validators: [Validators.maxLength(50), Validators.required],
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
      txtChooseProduct: [
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
      txtPointProduct: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(Environment.validators.patterns.onlyNumeric)
          ],
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
          validators: [Validators.maxLength(20), Validators.required],
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
    this.commonService.provinceSelection.subscribe((data) => {
      this.provinceList = data;
      this.provinceListS = this.getProvinceSouth(data);
      this.provinceListC = this.getProvinceCennter(data);
      this.provinceListN = this.getProvinceNorth(data);

    });
    // this.provinceListS = this.getProvinceSouth(this.provinceList);
  }
  doGetCampaignDetail(campaignID: number, campaignType: number) {
    this.campaignService.getCampaignDetail(campaignID, campaignType)?.subscribe(
      (result) => {
        if (result.responseStatus === 200) {
          this.presentToast(
            EToastType.success,
            this._translateService.instant(result.content.message)
          );
          this.campaignDetail = result.content.datas.campaignDetail;
          this.campaignRules = result.content.datas.campaignRules;
          this.campaignMonthlyGift = result.content.datas.campaignMonthlyGifts;
          this.campaignSessionGift = result.content.datas.campaignSessionGifts
          this.campaignEndGift = result.content.datas.campaignEndGifts;
          this.campaignProvinces = result.content.datas.campaignProvinces
          this.campaignStartDate = new Date(
            this.campaignDetail.campaignStartDate.toString()
          );
          this.campaignEndDate = new Date(
            this.campaignDetail.campaignEndDate.toString()
          );
          this.campaignRedemptionEndDate = new Date(
            this.campaignDetail.campaignRedemptionEndDate.toString()
          );
          this.campaignImgThumbnail =
          this.campaignDetail.campaignThumbnail;
        this.campaignImgBanner = this.campaignDetail.campaignBanner;
          console.log(this.campaignDetail);
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
    )
  }

  get email() {
    return this.campaignEditTabForm.get('email');
  }
  initializePage() {
    this.getPackingList();
  }
  async getPackingList() {
    forkJoin({
      productList: this.qrcodeService.getProductList(),
    })
      .pipe(delay(this.loadingTime))
      .subscribe(
        (result) => {
          if (result.productList.responseStatus === 200) {
            this.productList =
              result.productList.content.datas.producstList;
            this.presentToast(
              EToastType.success,
              this._translateService.instant(
                result.productList.content.message
              )
            );
          } else if (result.productList.responseStatus === 417) {
            this.presentToast(
              EToastType.warning,
              this._translateService.instant(
                result.productList.content.message
              )
            );
          } else {
            this.presentToast(
              EToastType.error,
              this._translateService.instant(
                result.productList.content.message
              )
            );
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
      );
  }
  getProvinceSouth(provinceList: Province[]) {
    let list: Province[] = [];
    for (let province of provinceList) {
      if (province.provinceNameOptional == "S") {
        list.push(province);
      }
    }
    return list;
  }
  getProvinceCennter(provinceList: Province[]) {
    let list: Province[] = [];
    for (let province of provinceList) {
      if (province.provinceNameOptional == "C") {
        list.push(province);
      }
    }
    return list;
  }
  getProvinceNorth(provinceList: Province[]) {
    let list: Province[] = [];
    for (let province of provinceList) {
      if (province.provinceNameOptional == "N") {
        list.push(province);
      }
    }
    return list;
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

  isDisable(): boolean {
    return this.campaignEditTabForm.valid;
  }

  onSelectEvent($event: any) {
    console.log($event);

    this.currentFile = $event;
  }
  showModalDialogEditMonthlyGift(gift: CampaignGifts) {
    const ref = this._dialog.open(DialogEditMonthlyGiftComponent, {
      header: "Chỉnh Sửa Quà Tặng Theo Tháng",
      width: '40%',
      // showHeader: false,
      closable: true,
      data: {
        isEdit: true,
        gift: gift
      },
    });
    // ref.onClose.subscribe((_) => this.getCustomerList());
  }
  showModalDialogEditQuarterlyGift(gift: CampaignGifts) {
    const ref = this._dialog.open(DialogEditQuarterlyGiftComponent, {
      header: "Chỉnh Sửa Quà Tặng Theo Quý",
      width: '40%',
      // showHeader: false,
      closable: true,
      data: {
        isEdit: true,
        gift: gift
      },
    });
    // ref.onClose.subscribe((_) => this.getCustomerList());
  }
  showModalDialogEditSpecialGift(gift: CampaignGifts) {
    const ref = this._dialog.open(DialogEditSpecialGiftComponent, {
      header: "Chỉnh Sửa Quà Tặng Đặc Biệt",
      width: '40%',
      // showHeader: false,
      closable: true,
      data: {
        isEdit: true,
        gift: gift
      },
    });
    // ref.onClose.subscribe((_) => this.getCustomerList());
  }
  showModalDialogAddSpecialGift() {
    const ref = this._dialog.open(DialogAddSpecialGiftComponent, {
      header: "Thêm Quà Tặng Đặc Biệt",
      width: '40%',
      // showHeader: false,
      closable: true,
    });
    // ref.onClose.subscribe((_) => this.getCustomerList());
  }
  showModalDialogAddQuarterlyGift() {
    const ref = this._dialog.open(DialogAddQuarterlyGiftComponent, {
      header: "Thêm Quà Tặng Theo Quý",
      width: '40%',
      // showHeader: false,
      closable: true,
    });
    // ref.onClose.subscribe((_) => this.getCustomerList());
  }
  // doGetCampaignDetail(campaignID: number, campaignType:number) {
  //   this.campaignService.getCampaignDetail(campaignID, campaignType)?.subscribe(
  //     (result) => {
  //       if (result.responseStatus === 200) {
  //         this.presentToast(
  // 					EToastType.success,
  // 					this._translateService.instant(result.content.message)
  // 				);
  //         this.campaignDetail = result.content.datas.campaignDetail;
  //         this.campaignRules = result.content.datas.campaignRules;
  //         this.campaignMonthlyGift = result.content.datas.campaignMonthlyGifts;
  //         this.campaignSessionGift = result.content.datas.campaignSessionGifts
  //         this.campaignEndGift = result.content.datas.campaignEndGifts;
  //         this.campaignStartDate = this.formatDate(
  //           new Date(this.campaignDetail.campaignStartDate.toString())
  //         );
  //         this.campaignEndDate = this.formatDate(
  //           new Date(this.campaignDetail.campaignEndDate.toString())
  //         );
  //         this.campaignRedemptionEndDate = this.formatDate(
  //           new Date(
  //             this.campaignDetail.campaignRedemptionEndDate.toString()
  //           )
  //         );
  //         this.campaignImgThumbnail =
  //           this.campaignDetail.campaignThumbnail;
  //         this.campaignImgBanner = this.campaignDetail.campaignBanner;
  //         console.log(this.campaignDetail);
  //       } else if (result.responseStatus === 417) {
  // 				this.presentToast(
  // 					EToastType.warning,
  // 					this._translateService.instant(result.content.message)
  // 				);
  // 			} else {
  // 				console.log(result);
  // 				this.presentToast(
  // 					EToastType.error,
  // 					this._translateService.instant(
  // 						'common.errors-message.common-server-error'
  // 					)
  // 				);
  // 			}
  //     }
  //   )
  // }
  doAddRuleCampaign(campaignId: number) {
    const ruleData: CampaignV1Rule = {
      productId: this.productId,
      productPoint: 1
    }

    console.log('ruledata', ruleData)

    this.campaignService.addRuleCampaign(ruleData, campaignId)?.subscribe(
      (result) => {
        console.log(result)
        if (result.responseStatus === 200) {
          this.presentToast(
            EToastType.success,
            this._translateService.instant(result.content.message)
          )
        } else if (result.responseStatus === 417) {
          this.presentToast(
            EToastType.warning,
            this._translateService.instant(result.content.message)
          )
        } else {
          this.presentToast(
            EToastType.error,
            this._translateService.instant(result.content.message)
          )
        }
      },
      (error) => {
        this.presentToast(
          EToastType.error,
          this._translateService.instant(error)
        )
      }
    )
  }


  doDeleteCampaignRule(campaignId: number, productId: number, message?: string): void {
    this._confirmationService.confirm({
      message: message,
      accept: () => {
        this.campaignService.deleteRuleCampaign(campaignId, productId)?.subscribe(
          (result) => {
            if (result.responseStatus === 200) {
              this.presentToast(
                EToastType.success,
                this._translateService.instant(result.content.message)
              )
            } else if (result.responseStatus == 417) {
              this.presentToast(
                EToastType.warning,
                this._translateService.instant(result.content.message)
              )
            } else {
              this.presentToast(
                EToastType.error,
                this._translateService.instant(result.content.message)
              )
            }
          },
          (error) => {
            console.error(error);
            this.presentToast(
              EToastType.error,
              this._translateService.instant(error)
            )
          }
        )
      }
    })
  }
  onSelectFront($event: any) {
    this.currentFileFront = $event.currentFiles[0];
  }
  onSelectBack($event: any) {
    this.currentFileBack = $event.currentFiles[0];
  }

  doActiveCampaign(slug: number, activeStatus: number, message?: string) {
    this._confirmationService.confirm({
      message: message,
      accept: () => {
        this._common.attachSpinner();
        this.campaignService
          .doActiveCampaign(slug, activeStatus)
          ?.subscribe(
            (result) => {
              if (result.responseStatus === 200) {
                this._common.detachSpinner();
                this.presentToast(
                  EToastType.success,
                  this._translateService.instant(
                    result.content.message
                  )
                );
                // this.openDialog(result.content.datas.companyProfile);
              } else if (result.responseStatus === 417) {
                this.presentToast(
                  EToastType.warning,
                  this._translateService.instant(
                    result.content.message
                  )
                );
                this._common.detachSpinner();
              } else {
                this.presentToast(
                  EToastType.error,
                  this._translateService.instant(
                    result.content.message
                  )
                );
                this._common.detachSpinner();
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
              this._common.detachSpinner();
            }
          );
      },
    });
  }
  doDeactiveCampaign(slug: number, activeStatus: number, message?: string) {
    this._confirmationService.confirm({
      message: message,
      accept: () => {
        this._common.attachSpinner();
        this.campaignService
          .doDeactiveCampaign(slug, activeStatus)
          ?.subscribe(
            (result) => {
              if (result.responseStatus === 200) {
                this._common.detachSpinner();
                this.presentToast(
                  EToastType.success,
                  this._translateService.instant(
                    result.content.message
                  )
                );
                // this.openDialog(result.content.datas.companyProfile);
              } else if (result.responseStatus === 417) {
                this.presentToast(
                  EToastType.warning,
                  this._translateService.instant(
                    result.content.message
                  )
                );
                this._common.detachSpinner();
              } else {
                this.presentToast(
                  EToastType.error,
                  this._translateService.instant(
                    result.content.message
                  )
                );
                this._common.detachSpinner();
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
              this._common.detachSpinner();
            }
          );
      },
    });
  }
  doUpdateCampaignInfo() {
    let formData = new FormData();
      this.currentStartDate = `${this.campaignStartDate.getFullYear()}-${this.campaignStartDate.getMonth() + 1
      }-${this.campaignStartDate.getDate()}`;
    this.currentEndDate = `${this.campaignEndDate.getFullYear()}-${this.campaignEndDate.getMonth() + 1
      }-${this.campaignEndDate.getDate()}`;
    this.currentRedemptionEndDate = `${this.campaignRedemptionEndDate.getFullYear()}-${this.campaignRedemptionEndDate.getMonth() + 1
      }-${this.campaignRedemptionEndDate.getDate()}`;
    formData.append(
      'campaignThumbnail',
      this.currentFileThumbnail || this.campaignImgThumbnail
    );
    formData.append(
      'campaignBanner',
      this.currentFileBanner || this.campaignImgBanner
    );
    formData.append(
      'campaignType',
      this.campaignEditTabForm.value.txtCampaignType
    );
    formData.append(
      'campaignGroupId',
      this.campaignEditTabForm.value.campaignGroupId
    );
    formData.append(
      'campaignTitle',
      this.campaignEditTabForm.value.txtCampaignTitle
    );
    formData.append(
      'campaignGiftsLimit',
      this.campaignEditTabForm.value.txtMaxGiftCampaign
    );
    formData.append(
      'campaignDescription',
      this.campaignEditTabForm.value.txtCampaignDescription
    );
    formData.append(
      'campaignRedemptionMethodDescription',
      this.campaignEditTabForm.value.txtCampaignRedemptionMethodDescription
    );
    formData.append(
      'campaignGeneralRulesDescription',
      this.campaignEditTabForm.value.txtCampaignGeneralRulesDescription
    );
    formData.append(
      'campaignStartDate',
      this.currentStartDate || this.campaignStartDate.toString()
    );
    formData.append(
      'campaignEndDate',
      this.currentEndDate || this.campaignEndDate.toString()
    );
    formData.append(
      'campaignRedemptionEndDate',
      this.currentRedemptionEndDate ||
      this.campaignRedemptionEndDate.toString()
    );

    this.campaignService
      .doUpdateCampaign(formData, this.campaignDetail.campaignId)
      ?.subscribe(
        (res: any) => {
          if (res.type === HttpEventType.UploadProgress) {
            //add progress bar
            // this.progress = Math.round(100 * event.loaded / event.total);
          } else if (res instanceof HttpResponse) {
            let result = res.body;
            console.log(result);
            if (result.responseStatus === 200) {
              this.presentToast(
                EToastType.success,
                this._translateService.instant(result.content.message)
              );
              this._ref.close();
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
      );
  }
  handleChange(e: any) {
    var index = e.index;
    console.log(index)
  }

  formatDate(date: Date) {
    function pad(s: any) {
      return s < 10 ? '0' + s : s;
    }
    return [
      date.getFullYear(),
      pad(date.getMonth() + 1),
      pad(date.getDate()),
    ].join('-');
  }
  getDate($event: any) {
    // this.currentBirthday = $event.value;
    let d = new Date(Date.parse($event));
    this.currentBirthday = `${d.getFullYear()}/${d.getMonth() + 1
      }/${d.getDate()}`;
  }
  onSelectThumbnail($event: any) {
    let selectedFiles: FileList = $event.files;
    this.currentFileThumbnail = selectedFiles[0];
  }

  onSelectBanner($event: any) {
    let selectedFiles: FileList = $event.files;
    this.currentFileBanner = selectedFiles[0];
  }

  handleShowThumbnail($event: any) {
    this.currentFileThumbnail = this.campaignImgThumbnail;
  }

  handleShowBanner($event: any) {
    this.currentFileBanner = this.campaignImgBanner;
  }

  onRemoveThumbnail($event: any) {
    this.currentFileThumbnail = this.fileUndefined;
  }

  onRemoveBanner($event: any) {
    this.currentFileBanner = this.fileUndefined;
  }
  getStartDate($event: any) {
    let d = new Date(Date.parse($event));
    this.currentStartDate = `${d.getFullYear()}-${d.getMonth() + 1
      }-${d.getDate()}`;
  }

  getEndDate($event: any) {
    let d = new Date(Date.parse($event));
    this.currentEndDate = `${d.getFullYear()}-${d.getMonth() + 1
      }-${d.getDate()}`;
  }

  getRedemptionEndDate($event: any) {
    let d = new Date(Date.parse($event));
    this.currentRedemptionEndDate = `${d.getFullYear()}-${d.getMonth() + 1
      }-${d.getDate()}`;
  }
  closeDialog(){
    this._ref.close();
  }
}
