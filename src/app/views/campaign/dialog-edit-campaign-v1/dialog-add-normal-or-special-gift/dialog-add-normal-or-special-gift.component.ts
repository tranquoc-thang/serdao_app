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
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-add-normal-or-special-gift',
  templateUrl: './dialog-add-normal-or-special-gift.component.html',
  styleUrls: ['./dialog-add-normal-or-special-gift.component.scss']
})
export class DialogAddNormalOrSpecialGiftComponent extends BaseComponent implements OnInit {

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

  addNormalOrSpecialForm!: FormGroup;
  ruleList!: {}[];
  giftList!: {}[];
  provinceList!: Province[];
  provinceListS!: Province[];
  provinceListC!: Province[];
  provinceListN!: Province[];
  displayModal!: boolean;
  currentProvince!: Province | null;

  currentSex!: number;
  currentFoundingDate!: string;
  currentGroup!: number;
  currentBirthday!: string;
  activationEmailStatus: boolean = false;
  currentFile!: string;
  isAddNormalGift!: boolean;

  ngOnInit(): void {
    this.isAddNormalGift = this.config.data.isAddNormalGift

    const overlay: HTMLDivElement = document.querySelector('.p-dialog-mask')!
    overlay.style.pointerEvents = 'unset';

    this.ruleList = [
      {
        productNo: 20002022,
        productName: 'Tấm ACB',
        productPoint: 1.5,

      },
      {
        productNo: 20002023,
        productName: 'Tấm ACB',
        productPoint: 3.5
      },
      {
        productNo: 20002024,
        productName: 'Tấm ACB',
        productPoint: 2.5
      },
      {
        productNo: 20002025,
        productName: 'Tấm ACB',
        productPoint: 5.5
      },
    ]
    this.giftList = [
      {
        icon: "https://apis.zeitgypsum.com/public/assets/images/default_avatar.png",
        giftName: 'Tấm ACB',
        productPoint: 1.5,
        dateStarExchange: new Date(),
        dateEndExchange: new Date()
      },
      {
        icon: "https://apis.zeitgypsum.com/public/assets/images/default_avatar.png",
        giftName: 'Tấm ACB',
        productPoint: 1.5,
        dateStarExchange: new Date(),
        dateEndExchange: new Date()
      },
      {
        icon: "https://apis.zeitgypsum.com/public/assets/images/default_avatar.png",
        giftName: 'Tấm ACB',
        productPoint: 1.5,
        dateStarExchange: new Date(),
        dateEndExchange: new Date()
      },
    ]

    this._translateService
      .get('primeng')
      .subscribe((res) => this.primeConfig.setTranslation(res));
    this.addNormalOrSpecialForm = this.formBuilder.group({
      txtPointExchange: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(Environment.validators.patterns.onlyNumeric)
          ],
          asyncValidators: [
            // this._validate.emailExistingValidator('cd', 'cm', true),
          ],
          updateOn: 'change',
        },
      ],
      txtGiftName: [
        '',
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: [],
          updateOn: 'change',
        },
      ],
      txtQuantityExchange: [
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
    this.commonService.provinceSelection.subscribe((data) => {
      this.provinceList = data;
      this.provinceListS = this.getProvinceSouth(data);
      this.provinceListC = this.getProvinceCennter(data);
      this.provinceListN = this.getProvinceNorth(data);
    });
    // this.provinceListS = this.getProvinceSouth(this.provinceList);
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
    return this.addNormalOrSpecialForm.valid;
  }

  onSelectEvent($event: any) {
    console.log($event);

    this.currentFile = $event;
  }
  checkAll() {
    $('group1').addClass('checked');
  }

}
