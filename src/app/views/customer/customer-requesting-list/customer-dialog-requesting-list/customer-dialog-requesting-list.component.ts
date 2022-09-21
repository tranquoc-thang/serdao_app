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
import { CustomerCreateDto, CustomerDto, CustomerUpdateDto } from '@app/interfaces/dtos/customer.dto';
import { Province } from '@app/interfaces/models/province.entity';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { Environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { delay } from 'rxjs/operators';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

interface SelectedCity {
  provinceId: number;
  provinceName: string;
}
@Component({
  selector: 'app-customer-dialog-requesting-list',
  templateUrl: './customer-dialog-requesting-list.component.html',
  styleUrls: ['./customer-dialog-requesting-list.component.scss'],
})
export class CustomerDialogRequestingListComponent
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
    public config: DynamicDialogConfig,
    public _confirmationService: ConfirmationService
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

  customerEditForm!: FormGroup;
  provinceList!: Province[];
  displayModal!: boolean;
  currentProvince!: SelectedCity;

  currentSex!: number;
  currentFoundingDate!: string;
  currentGroup!: number;
  currentBirthday!: string;
  activationEmailStatus: boolean = false;
  currentFile!: string;
  customerDataProp!: CustomerDto;

  customerNo!: string;
  customerName!: string;
  customerBirthday!: Date;
  groupName!: string;
  customerAddress!: string;
  customerProvinceName!: string;
  customerProvinceId!: number;
  companyName!: string;
  customerIdentification!: string

  approveRequestingProfile!: Function;
  deletionRequestingProfile!: Function;
  saveRequestingProfile!: Function;
  isCustomerUpdation!: boolean;


  ngOnInit(): void {
    this.customerDataProp = this.config.data.dataCustomer
    this.approveRequestingProfile = this.config.data.approveRequestingProfile
    this.deletionRequestingProfile = this.config.data.deletionRequestingProfile
    this.saveRequestingProfile = this.config.data.saveRequestingProfile
    this.isCustomerUpdation = this.config.data.isCustomerUpdation

    const overlay: HTMLDivElement = document.querySelector('.p-dialog-mask')!
    overlay.style.pointerEvents = 'unset';

    this._translateService
      .get('primeng')
      .subscribe((res) => this.primeConfig.setTranslation(res));
    this.customerEditForm = this.formBuilder.group({
      txtEmail: [
        '',
        {
          validators: [
            Validators.maxLength(150),
            Validators.pattern(Environment.validators.patterns.email),
            Validators.required,
          ],
          asyncValidators: [
            // this._validate.emailExistingValidator('cd', 'cm', true),
          ],
          updateOn: 'change',
        },
      ],
      txtPhoneNumber: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12),
            Validators.pattern(
              Environment.validators.patterns.onlyNumeric
            )
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      // txtPassword: [
      //   '',
      //   {
      //     validators: [
      //       Validators.maxLength(150),
      //       Validators.pattern(
      //         Environment.validators.patterns.onlyNumeric
      //       ),
      //     ],
      //     asyncValidators: [],
      //     updateOn: 'change',
      //   },
      // ],
      txtCompanyName: [
        '',
        {
          validators: [
            Validators.maxLength(500),
            Validators.required
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtName: [
        '',
        {
          validators: [Validators.maxLength(50), Validators.required],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtIdentification: [
        '',
        {
          validators: [
            Validators.pattern(
              Environment.validators.patterns.onlyNumeric
            ),
            Validators.required
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtBirthday: [
        '',
        {
          validators: [],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtAddress: [
        '',
        {
          validators: [
            Validators.maxLength(1000),
            Validators.required
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtProvince: [
        '',
        {
          validators: [
            Validators.required
          ],
          asynsValidators: [],
          updateOn: 'change'
        }
      ],
      txtUploadImgFrontName: [
        '',
        {
          validators: [
            Validators.required
          ],
          asynsValidators: [],
          updateOn: 'change'
        }
      ]
    });
    this.getCustomerRequestUpdationProfile()
  }

  onClose() {
    console.log('Hello')
  }

  handleApproveRequestingProfile() {
    const newCustomerInfo: CustomerUpdateDto = {
      customerName: this.customerEditForm.value.txtName,
      customerBirthday: this.customerEditForm.value.txtBirthday || this.customerBirthday,
      customerAddress: this.customerEditForm.value.txtAddress,
      provinceId: this.currentProvince?.provinceId || this.customerProvinceId,
      provinceName: this.currentProvince?.provinceName || this.customerProvinceName,
      companyName: this.customerEditForm.value.txtCompanyName,
      customerIdentification: this.customerIdentification
    }

    this.approveRequestingProfile(newCustomerInfo, this.customerNo, "Bạn muốn xác nhận thông tin khách hàng này?")
  }

  handleDeletionRequestingProfile() {
    this.deletionRequestingProfile(this.customerNo, 'Bạn muốn xóa yêu cầu cập nhật thông tin của khách hàng này?')
  }

  handleSaveRequestingProfile() {

    const newCustomerInfo: CustomerUpdateDto = {
      customerName: this.customerEditForm.value.txtName,
      customerBirthday: this.customerEditForm.value.txtBirthday,
      customerAddress: this.customerEditForm.value.txtAddress,
      provinceId: this.currentProvince?.provinceId || this.customerProvinceId,
      provinceName: this.currentProvince?.provinceName || this.customerProvinceName,
      companyName: this.customerEditForm.value.txtCompanyName,
      customerIdentification: this.customerIdentification
    }

    console.log(newCustomerInfo)

    this.saveRequestingProfile(newCustomerInfo, this.customerNo, "Bạn muốn lưu thông tin khách hàng?")
  }

  async getCustomerRequestUpdationProfile() {

    this.customerService.getCustomerRequestUpdationProfile(this.customerDataProp.customerNo)?.subscribe(
      (result) => {
        if (result.responseStatus === 200) {

          const {
            customerNo,
            customerName,
            customerBirthday,
            customerAddress,
            provinceId,
            provinceName,
            groupName,
            companyName,
            customerIdentification
          } = result.content.datas.customerDetail

          this.customerNo = customerNo
          this.customerName = customerName
          this.customerIdentification = customerIdentification
          this.customerBirthday = customerBirthday
          this.customerAddress = customerAddress
          this.customerProvinceId = provinceId
          this.customerProvinceName = provinceName
          this.groupName = groupName
          this.companyName = companyName
          this.customerBirthday = new Date(customerBirthday)


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
            this._translateService.instant('common.errors-message.common-server-error')
          )
        }
      },
      (error) => {
        this.presentToast(
          EToastType.error,
          this._translateService.instant('common.errors-message.common-server-error')
        )
      }
    )
  }

  // createCustomer() {
  //   const newCustomer: CustomerCreateDto = {
  //     customerPhone: this.customerCreateForm.value.txtPhoneNumber,
  //     customerEmail: this.customerCreateForm.value.txtEmail,
  //     customerPassword: this.customerCreateForm.value.txtPassword,
  //     customerName: this.customerCreateForm.value.txtName,
  //     companyName: this.customerCreateForm.value.txtCompanyName,
  //     customerIdentification:
  //       this.customerCreateForm.value.txtIdentification,
  //     customerBirthday: this.currentBirthday,
  //     customerAddress: this.customerCreateForm.value.txtAddress,
  //     customerProvinceId: this.currentProvince?.provinceId,
  //     customerProvinceName: this.currentProvince?.provinceName,
  //     customerGroup: this.currentGroup,
  //     customerIdentificationFront: this.currentFile,
  //     customerIdentificationBack: this.currentFile,
  //   };
  //   this.customerService.createCustomer(newCustomer)?.subscribe(
  //     (result) => {
  //       if (result.responseStatus === 200) {
  //         this.presentToast(
  //           EToastType.success,
  //           this._translateService.instant(result.content.message)
  //         );
  //         this._ref.close();
  //       } else if (result.responseStatus === 417) {
  //         this.presentToast(
  //           EToastType.warning,
  //           this._translateService.instant(result.content.message)
  //         );
  //       } else {
  //         console.log(result);
  //         this.presentToast(
  //           EToastType.error,
  //           this._translateService.instant(
  //             'common.errors-message.common-server-error'
  //           )
  //         );
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.presentToast(
  //         EToastType.error,
  //         this._translateService.instant(
  //           'common.errors-message.common-server-error'
  //         )
  //       );
  //     }
  //   );
  // }

  get email() {
    return this.customerEditForm.get('email');
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

  getProvinced($event: Province) {
    this.currentProvince = $event;
  }

  getProvince($event: Province) {
    this.currentProvince = $event;
  }

  isDisable(): boolean {
    return this.customerEditForm.valid;
  }

  onSelectEvent($event: any) {
    console.log($event);

    this.currentFile = $event;
  }
}
