import { resolve } from 'path';
import { CampaignDto, CampaignRules, CampaignGifts, CampaignV1Rule, CampaignProvinces, CampaignProvincesUpdate } from './../../../interfaces/dtos/campaign.dto';
import { CampaignService } from './../../../services/campaign/campaign.service';
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
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DialogEditNormalOrSpecialGiftComponent } from './dialog-edit-normal-or-special-gift/dialog-edit-normal-or-special-gift.component';
import { DialogAddNormalOrSpecialGiftComponent } from './dialog-add-normal-or-special-gift/dialog-add-normal-or-special-gift.component';
import { ProductDto } from '@app/interfaces/dtos/product.dto';
import { forkJoin } from 'rxjs';
import { QrCodeService } from '@app/services/qrcode/qrcode.service';
import { delay } from 'rxjs/operators';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { GroupList } from '@app/interfaces/models/group.entity';

@Component({
  selector: 'app-dialog-edit-campaign-v1',
  templateUrl: './dialog-edit-campaign-v1.component.html',
  styleUrls: ['./dialog-edit-campaign-v1.component.scss']
})
export class DialogEditCampaignV1Component
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
    public _confirmationService: ConfirmationService,
    public formBuilder: FormBuilder,
    private _ref: DynamicDialogRef,
    private primeConfig: PrimeNGConfig,
    private commonService: CommonService,
    public config: DynamicDialogConfig,
    public campaignService: CampaignService,
    public qrcodeService: QrCodeService,
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
  accumulatePointsRuleForm!: FormGroup;
  subjectList!: {}[];
  provinceList!: Province[];
  provinceListS!: Province[];
  provinceListC!: Province[];
  provinceListN!: Province[];
  campaignTypeList!: {}[];
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
  campaignStartDate!: Date;
  campaignImgBanner!: any;
  campaignEndDate!: Date;
  campaignRedemptionEndDate!: Date;
  campaignImgThumbnail!: any;
  currentFileBanner!: File;
  currentFileThumbnail!: File;
  campaignDetail!: CampaignDto;
  campaignRules!: CampaignRules[];
  campaignNormalGifts!: CampaignGifts[];
  campaignSpecialGifts!: CampaignGifts[];
  currentFileFront!: File;
  currentFileBack!: File;
  isAddNormalGift: boolean = true;
  isEditNormalGift: boolean = true;
  productId!: number;
  productPoint!: number;
  fileUndefined!: File;
  disabled: boolean = true;
  campaignProvinces!: CampaignProvinces[];
  currentStartDate!: string;
  currentEndDate!: string;
  currentRedemptionEndDate!: string;
  groupList!: GroupList[];

  ngOnInit(): void {
    this.campaignID = this.config.data.campaignID;
    this.campaignType = this.config.data.campaignType;
    this.doGetCampaignDetail(this.campaignID, this.campaignType)
    this.initializePage();

    this.getGroupList();

    this.campaignTypeList = [
      {
        campaignTypeId: 1,
        campaignTypeName: 'Chiến Dịch 1',
      },
      {
        campaignTypeId: 2,
        campaignTypeName: 'Chiến Dịch 2',
      },
      {
        campaignTypeId: 3,
        campaignTypeName: 'Chiến Dịch 3',
      },
    ];

    this._translateService
      .get('primeng')
      .subscribe((res) => this.primeConfig.setTranslation(res));
    this.campaignEditTabForm = this.formBuilder.group({
      txtStartDate: [
        '',
        {
          validators: [],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtEndDate: [
        '',
        {
          validators: [],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtEndDateGift: [
        '',
        {
          validators: [],
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
      // txtCampaignType: [
      // 	'',
      // 	{
      // 		validators: [Validators.maxLength(500), Validators.required],
      // 		asyncValidators: [],
      // 		updateOn: 'change',
      // 	},
      // ],
      txtCampaignGroupId: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      // txtMaxGift: [
      // 	'',
      // 	{
      // 		validators: [
      // 			Validators.required,
      // 			Validators.pattern(
      // 				Environment.validators.patterns.onlyNumeric
      // 			),
      // 		],
      // 		asyncValidators: [],
      // 		updateOn: 'change',
      // 	},
      // ],
      txtCampaignGiftsLimit: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(
              Environment.validators.patterns.onlyNumeric
            ),
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtCampaignGiftCurrentTotal: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(
              Environment.validators.patterns.onlyNumeric
            ),
          ],
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
    // this.commonService.provinceSelection.subscribe((data) => {
    //   this.provinceList = data;
    //   this.provinceListS = this.getProvinceSouth(data);
    //   this.provinceListC = this.getProvinceCennter(data);
    //   this.provinceListN = this.getProvinceNorth(data);

    // });
    // this.provinceListS = this.getProvinceSouth(this.provinceList);

  }

  async doGetCampaignDetail(campaignID: number, campaignType: number) {
    this.campaignService.getCampaignDetail(campaignID, campaignType)?.subscribe(
      (result) => {
        if (result.responseStatus === 200) {
          this.presentToast(
            EToastType.success,
            this._translateService.instant(result.content.message)
          );
          this.campaignDetail = result.content.datas.campaignDetail;
          console.log(result.content.datas)
          this.campaignRules = result.content.datas.campaignRules;
          this.campaignNormalGifts = result.content.datas.campaignNormalGifts;
          this.campaignSpecialGifts = result.content.datas.campaignSpecialGifts
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

  doAddRuleCampaign(campaignId: number) {
    const ruleData: CampaignV1Rule = {
      productId: this.productId,
      productPoint: this.productPoint
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

          this.doGetCampaignDetail(this.campaignID, this.campaignType);
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
            this._common.attachSpinner();

            if (result.responseStatus === 200) {
              this.presentToast(
                EToastType.success,
                this._translateService.instant(result.content.message)
              )

              this.doGetCampaignDetail(this.campaignID, this.campaignType);
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

  handleDoGetCampaignDetail() {
    this.doGetCampaignDetail(this.campaignID, this.campaignType)
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

  // doUpdateCampaignInfo() {
  //   let formData = new FormData();

  //   formData.append(
  //     'campaignThumbnail',
  //     this.currentFileThumbnail || this.campaignImgThumbnail
  //   );
  //   formData.append(
  //     'campaignBanner',
  //     this.currentFileBanner || this.campaignImgBanner
  //   );
  //   formData.append(
  //     'campaignType',
  //     this.campaignDetail.campaignType.toString()
  //   );
  //   formData.append(
  //     'campaignGroupId',
  //     this.campaignEditTabForm.value.txtCampaignTarget
  //   );
  //   formData.append(
  //     'campaignTitle',
  //     this.campaignEditTabForm.value.txtCampaignTitle
  //   );
  //   formData.append(
  //     'campaignGiftsLimit',
  //     this.campaignEditTabForm.value.txtMaxGiftCampaign
  //   );
  //   formData.append(
  //     'campaignDescription',
  //     this.campaignEditTabForm.value.txtCampaignDescription
  //   );
  //   formData.append(
  //     'campaignRedemptionMethodDescription',
  //     this.campaignEditTabForm.value.txtCampaignRedemptionMethodDescription
  //   );
  //   formData.append(
  //     'campaignGeneralRulesDescription',
  //     this.campaignEditTabForm.value.txtCampaignGeneralRulesDescription
  //   );
  //   formData.append(
  //     'campaignStartDate',
  //     this.campaignStartDate
  //   );
  //   formData.append(
  //     'campaignEndDate', this.campaignEndDate
  //   );
  //   formData.append(
  //     'campaignRedemptionEndDate', this.campaignRedemptionEndDate
  //   );

  //   this.campaignService
  //     .doUpdateCampaign(formData, this.campaignDetail.campaignId)
  //     ?.subscribe(
  //       (res: any) => {
  //         if (res.type === HttpEventType.UploadProgress) {
  //           //add progress bar
  //           // this.progress = Math.round(100 * event.loaded / event.total);
  //         } else if (res instanceof HttpResponse) {
  //           let result = res.body;
  //           console.log(result);
  //           if (result.responseStatus === 200) {
  //             this.presentToast(
  //               EToastType.success,
  //               this._translateService.instant(result.content.message)
  //             );
  //             this._ref.close();
  //           } else if (result.responseStatus === 417) {
  //             this.presentToast(
  //               EToastType.warning,
  //               this._translateService.instant(result.content.message)
  //             );
  //           } else {
  //             console.log(result);
  //             this.presentToast(
  //               EToastType.error,
  //               this._translateService.instant(
  //                 'common.errors-message.common-server-error'
  //               )
  //             );
  //           }
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.presentToast(
  //           EToastType.error,
  //           this._translateService.instant(
  //             'common.errors-message.common-server-error'
  //           )
  //         );
  //       }
  //     );
  // }

  // getProvinceSouth(provinceList: Province[]) {
  //   let list: Province[] = [];
  //   for (let province of provinceList) {
  //     if (province.provinceNameOptional == "S") {
  //       list.push(province);
  //     }
  //   }
  //   return list;
  // }
  // getProvinceCennter(provinceList: Province[]) {
  //   let list: Province[] = [];
  //   for (let province of provinceList) {
  //     if (province.provinceNameOptional == "C") {
  //       list.push(province);
  //     }
  //   }
  //   return list;
  // }
  // getProvinceNorth(provinceList: Province[]) {
  //   let list: Province[] = [];
  //   for (let province of provinceList) {
  //     if (province.provinceNameOptional == "N") {
  //       list.push(province);
  //     }
  //   }
  //   return list;
  // }

  getGroupList() {
    this._common.groupSelection.subscribe((data) => {
      const newData: GroupList[] = [
        {
          createdDate: new Date(),
          createdUser: 900000000010,
          groupDescription: '',
          groupId: 0,
          groupName: 'Đại Lý | Thầu Thợ',
          groupNameOptional: '',
          status: 9,
          updatedDate: new Date(),
          updatedUser: 0,
        },
        ...data,
      ];
      this.groupList = newData;
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
      this.campaignDetail.campaignType.toString()
    );
    formData.append(
      'campaignGroupId',
      this.campaignEditTabForm.value.txtCampaignGroupId
    );
    formData.append(
      'campaignTitle',
      this.campaignEditTabForm.value.txtCampaignTitle
    );
    formData.append(
      'campaignGiftsLimit',
      this.campaignEditTabForm.value.txtCampaignGiftsLimit
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

  showModalDialogEditNormalOrSpecialGift(isNormalGiftFlags: boolean) {
    if (isNormalGiftFlags) {
      const ref = this._dialog.open(DialogEditNormalOrSpecialGiftComponent, {
        header: "Chỉnh Sửa Quà Tặng",
        width: '40%',
        data: {
          isEditNormalGift: isNormalGiftFlags
        },
        closable: true,
      });
      // ref.onClose.subscribe((_) => this.getCustomerList());
    } else {
      const ref = this._dialog.open(DialogEditNormalOrSpecialGiftComponent, {
        header: "Chỉnh Sửa Quà Tặng Đặc Biệt",
        width: '40%',
        data: {
          isEditNormalGift: isNormalGiftFlags
        },
        closable: true,
      });
      // ref.onClose.subscribe((_) => this.getCustomerList());
    }
  }

  showModalDialogAddNormalOrSpecialGift(isNormalGiftFlags: boolean) {
    if (isNormalGiftFlags) {
      const ref = this._dialog.open(DialogAddNormalOrSpecialGiftComponent, {
        header: "Thêm Quà Tặng",
        width: '40%',
        data: {
          isAddNormalGift: isNormalGiftFlags
        },
        // showHeader: false,
        closable: true,
      });
      // ref.onClose.subscribe((_) => this.getCustomerList());
    } else {
      const ref = this._dialog.open(DialogAddNormalOrSpecialGiftComponent, {
        header: "Thêm Quà Tặng Đặc Biệt",
        width: '40%',
        data: {
          isAddNormalGift: isNormalGiftFlags
        },
        // showHeader: false,
        closable: true,
      });
      // ref.onClose.subscribe((_) => this.getCustomerList());
    }
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

  checkAll() {
    $('group1').addClass('checked');
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


}
