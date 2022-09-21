import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { ColumnsTableDto } from '@app/interfaces/dtos/columns-table.dto';
import { CompanyDto, CompanyUpdateDto } from '@app/interfaces/dtos/company.dto';
import { CustomerDto, CustomerSearch, CustomerUpdateDto } from '@app/interfaces/dtos/customer.dto';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CustomerDialogRequestingListComponent } from './customer-dialog-requesting-list/customer-dialog-requesting-list.component';
import { CustomerDialogDetailContentComponent } from '../customer-dialog-detail-content/customer-dialog-detail-content.component';

@Component({
	selector: 'app-customer-requesting-list',
	templateUrl: './customer-requesting-list.component.html',
	styleUrls: ['./customer-requesting-list.component.scss'],
	providers: [DialogService]
})
export class CustomerRequestingListComponent extends BaseComponent {
	public customerInitialized: boolean = false;
	public userInfo!: CompanyDto;
	public screenWidth!: any;
	public customerRequestingList!: CustomerDto[];
	public currentPage: {
		first: number;
		rows: number;
		page: number;
		pageCount: number;
	} = { first: 0, rows: 10, page: 0, pageCount: 10 };
	public totalRecords!: number;
	public pageLinks!: number;

	public doDeleteCallback!: Function;
	public doDeactiveCallback!: Function;
	public doEditCallback!: Function;

	public cols!: ColumnsTableDto[];
	public listSelect!: CompanyDto[];

	public dtOptions: DataTables.Settings = {
		pagingType: 'full_numbers',
		pageLength: 2,
	};

	public isCustomerUpdation: boolean = true;

	constructor(
		_activatedRoute: ActivatedRoute,
		_pageTitle: Title,
		_router: Router,
		_materialDialog: MatDialog,
		_common: CommonService,
		_validate: ValidationUtil,
		_toast: ToastrService,
		_translateService: TranslateService,
		_dialog: DialogService,
		public dialog: MatDialog,
		public customerService: CustomerService,
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
		this._pageTitle.setTitle(
			this._translateService.instant('pages.customer.labels.page-title-customer-require-info')
		);
	}

	ngOnInit(): void {
		this.initializePage();
	}

	initializePage() {
		// this.doDeleteCallback = this.doDelete.bind(this);
		// this.doDeactiveCallback = this.doDeactive.bind(this);
		// this.doEditCallback = this.doEdit.bind(this);
		this.cols = [
			{
				field: 'customerNo',
				header: this._translateService.instant(
					'pages.customer.labels.customer-no'
				),
				type: 'string',
			},
			{
				field: 'groupName',
				header: this._translateService.instant(
					'pages.customer.labels.customer-group-name'
				),
				type: 'string',
			},
			{
				field: 'customerName',
				header: this._translateService.instant(
					'pages.customer.labels.customer-full-name'
				),
				type: 'string',
			},
			{
				field: 'customerIdentification',
				header: this._translateService.instant(
					'pages.customer.labels.customer-CMND-CCCD'
				),
				type: 'string',
			},
			{
				field: 'customerPhone',
				header: this._translateService.instant(
					'pages.customer.labels.customer-phone-number'
				),
				type: 'string',
			},
			{
				field: 'customerEmail',
				header: this._translateService.instant(
					'pages.customer.labels.customer-email'
				),
				type: 'string',
			},

			{
				field: 'status',
				header: this._translateService.instant(
					'pages.customer.labels.status'
				),
				type: 'status',
			},
		];

		this.getCustomerRequestingList();
	}

	async getCustomerRequestingList() {
		this._common.attachSpinner();
		forkJoin({
			response: this.customerService.getCustomerRequestUpdationList({
				page: this.currentPage.page + 1,
				perPage: this.currentPage.rows,
				sort: {
					filedName: '',
					sortType: 'asc|desc',
				},
			}),
			customerInitialized: of(true),
		})
			.pipe(delay(this.loadingTime))
			.subscribe(
				(result) => {
					if (result.response.responseStatus === 200) {
						this.customerInitialized = result.customerInitialized;

						this.customerRequestingList = result.response.content.datas.datasList;
						//Total record
						this.totalRecords = result.response.content.datas.totalDatas;

						//Number of paging button
						this.pageLinks = Math.round(
							this.totalRecords / this.currentPage.rows + 1
						);

						this.presentToast(
							EToastType.success,
							this._translateService.instant(
								result.response.content.message
							)
						);
					} else if (result.response.responseStatus === 417) {
						this.presentToast(
							EToastType.warning,
							this._translateService.instant(
								result.response.content.message
							)
						);
					} else {
						this.presentToast(
							EToastType.error,
							this._translateService.instant(
								result.response.content.message
							)
						);
					}
					this._common.detachSpinner();
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

	doApproveRequestingProfile(customerInfo: CustomerUpdateDto, customerNo: string, message?: string) {
		this._confirmationService.confirm({
			message: message,
			accept: () => {
				const {
					customerName,
					customerIdentification,
					customerAddress,
					customerBirthday,
					provinceName,
					provinceId,
					companyName
				} = customerInfo

				const newCustomerInfo = {
					customerName,
					customerIdentification,
					customerAddress,
					customerBirthday,
					customerProvinceName: provinceName,
					customerProvinceId: provinceId,
					companyName
				}

				console.log('doappro', newCustomerInfo)

				this.customerService.approveRequestingProfile(newCustomerInfo, customerNo)
					?.subscribe(
						(result) => {
							console.log(result)
							if (result.responseStatus === 200) {
								this.presentToast(
									EToastType.success,
									this._translateService.instant(
										result.content.message
									)
								);
								this.getCustomerRequestingList();
							} else if (result.responseStatus === 417) {
								this.presentToast(
									EToastType.warning,
									this._translateService.instant(
										result.statusText as string
									)
								);
							} else {
								this.presentToast(
									EToastType.error,
									this._translateService.instant(
										result.content.message
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
			},
		});
	}

	deletionRequestingProfile(customerNo: string, message?: string) {
		this._confirmationService.confirm(
			{
				message: message,
				accept: () => {

					this.customerService.deletionRequestingProfile(customerNo)?.subscribe(
						(result) => {
							if (result.responseStatus === 200) {
								this.presentToast(
									EToastType.success,
									this._translateService.instant(result.content.message)
								)
							} else if (result.responseStatus == 417) {
								this.presentToast(
									EToastType.warning,
									this._translateService.instant(result.statusText as string)
								)
							} else {
								this.presentToast(
									EToastType.error,
									this._translateService.instant(result.statusText as string)
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
			}
		)
	}

	saveRequestingProfile(customerInfo: CustomerUpdateDto, customerNo: string, message?: string) {
		const {
			customerName,
			customerIdentification,
			customerAddress,
			customerBirthday,
			provinceName,
			provinceId,
			companyName
		} = customerInfo

		const newCustomerInfo = {
			customerName,
			customerIdentification,
			customerAddress,
			customerBirthday,
			customerProvinceName: provinceName,
			customerProvinceId: provinceId,
			companyName
		}

		console.log(newCustomerInfo)

		this._confirmationService.confirm({
			message: message,
			accept: () => {
				this.customerService.saveRequestingProfile(newCustomerInfo, customerNo)?.subscribe(
					(result) => {
						if (result.responseStatus === 200) {
							this.presentToast(
								EToastType.success,
								this._translateService.instant(
									result.content.message
								)
							)
						} else if (result.responseStatus == 417) {
							this.presentToast(
								EToastType.warning,
								this._translateService.instant(
									result.content.message
								)
							)
						} else {
							this.presentToast(
								EToastType.error,
								this._translateService.instant(
									result.content.message
								)
							)
						}
					},
					(error) => {
						console.error(error)
						this.presentToast(
							EToastType.error,
							this._translateService.instant(error)
						)
					}
				)
			}
		})
	}

	// doEdit(slug: string) {
	// 	this._common.attachSpinner();
	// 	this.companyService.getDetailCompany(slug)?.subscribe(
	// 		(result) => {
	// 			if (result.responseStatus === 200) {
	// 				this._common.detachSpinner();
	// 				this.openDialog(result.content.datas.companyProfile);
	// 			} else if (result.responseStatus === 417) {
	// 				this.presentToast(
	// 					EToastType.warning,
	// 					this._translateService.instant(result.content.message)
	// 				);
	// 				this._common.detachSpinner();
	// 			} else {
	// 				this.presentToast(
	// 					EToastType.error,
	// 					this._translateService.instant(result.content.message)
	// 				);
	// 				this._common.detachSpinner();
	// 			}
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 			this.presentToast(
	// 				EToastType.error,
	// 				this._translateService.instant(
	// 					'common.errors-message.common-server-error'
	// 				)
	// 			);
	// 			this._common.detachSpinner();
	// 		}
	// 	);
	// }

	// doDelete(slug: string, message?: string) {
	// 	this._confirmationService.confirm({
	// 		message: message,
	// 		accept: () =>
	// 			this.companyService.doDeleteCompany(slug)?.subscribe(
	// 				(result) => {
	// 					if (result.responseStatus === 200) {
	// 						this.presentToast(
	// 							EToastType.success,
	// 							this._translateService.instant(result.content.message)
	// 						);
	// 						this.getCompanyList();
	// 					} else if (result.responseStatus === 417) {
	// 						this.presentToast(
	// 							EToastType.warning,
	// 							this._translateService.instant(result.content.message)
	// 						);
	// 					} else {
	// 						this.presentToast(
	// 							EToastType.error,
	// 							this._translateService.instant(result.content.message)
	// 						);
	// 					}
	// 				},
	// 				(error) => {
	// 					console.log(error);
	// 					this.presentToast(
	// 						EToastType.error,
	// 						this._translateService.instant(
	// 							'common.errors-message.common-server-error'
	// 						)
	// 					);
	// 				}
	// 			),
	// 	});
	// }

	// Emit data customer requesting list
	addCustomerRequestingUpdationList(newCustomerRequestingUpdationList: CustomerDto[]) {
		console.log("Emit EVent", newCustomerRequestingUpdationList)
		this.customerRequestingList = newCustomerRequestingUpdationList
		console.log('new Customer', this.customerRequestingList)
	}

	public getCurrentPage($event: {
		first: number;
		rows: number;
		page: number;
		pageCount: number;
	}) {
		this.currentPage = $event;
		// this.getCustomerList();
	}

	public getSelectionData($event: CompanyDto[]) {
		this.listSelect = $event;
	}

	openDialog(data: any) {
		this.customerService.setCurrentCompany(data);
		const ref = this._dialog.open(CustomerDialogDetailContentComponent, {
			header: this._translateService.instant(
				'pages.company.labels.detail-dialog-title'
			),
			width: '50vw',
		});

		// ref.onClose.subscribe((_) => this.getCustomerList());
	}

	showModalDialog(dataCustomer: CustomerDto) {
		const ref = this._dialog.open(CustomerDialogRequestingListComponent, {
			data: {
				dataCustomer: dataCustomer,
				isCustomerUpdation: this.isCustomerUpdation,
				approveRequestingProfile: this.doApproveRequestingProfile,
				deletionRequestingProfile: this.deletionRequestingProfile,
				saveRequestingProfile: this.saveRequestingProfile
			},
			header: this.changeHeaderDialog(dataCustomer.groupId),
			width: '40vw',
		});
		ref.onClose.subscribe((_) => this.getCustomerRequestingList());
	}

	changeHeaderDialog(dataGroupId: number) {
		if (dataGroupId === 1) {
			return this._translateService.instant(
				'pages.customer.labels.update-dialog-title-prime'
			)
		} else {
			return this._translateService.instant(
				'pages.customer.labels.update-dialog-title-second'
			)
		}
	}
}
