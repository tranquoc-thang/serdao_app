import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EToastType } from '@app/constants';
import { ColumnsTableDto } from '@app/interfaces/dtos/columns-table.dto';
import { CompanyDto, CompanyUpdateDto } from '@app/interfaces/dtos/company.dto';
import { CustomerDto } from '@app/interfaces/dtos/customer.dto';
import { CommonService } from '@app/services/common/common.service';
import { CustomerService } from '@app/services/customer/customer.service';
import { ValidationUtil } from '@app/utilities/validation.util';
import { BaseComponent } from '@app/views/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CustomerDialogContentComponent } from '../customer-dialog-content/customer-dialog-content.component';
import { CustomerDialogDetailContentComponent } from '../customer-dialog-detail-content/customer-dialog-detail-content.component';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-customer-new',
	templateUrl: './customer-new.component.html',
	styleUrls: ['./customer-new.component.scss'],
	providers: [DialogService],
})
export class CustomerNewComponent extends BaseComponent {
	public customerInitialized: boolean = false;
	public userInfo!: CompanyDto;
	public screenWidth!: any;
	public customerList!: CustomerDto[];
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
	// public mainForm!: FormGroup;

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
			this._translateService.instant(
				'pages.customer.labels.page-title-new-customer'
			)
		);
	}

	ngOnInit(): void {
		this.initializePage();
	}

	initializePage() {
		// this.cols = [
		// 	{
		// 		field: 'customerNo',
		// 		header: this._translateService.instant(
		// 			'pages.customer.labels.customer-no'
		// 		),
		// 		type: 'string',
		// 	},
		// 	{
		// 		field: 'groupName',
		// 		header: this._translateService.instant(
		// 			'pages.customer.labels.customer-group-name'
		// 		),
		// 		type: 'string',
		// 	},
		// 	{
		// 		field: 'customerName',
		// 		header: this._translateService.instant(
		// 			'pages.customer.labels.customer-full-name'
		// 		),
		// 		type: 'string',
		// 	},
		// 	{
		// 		field: 'customerIdentification',
		// 		header: this._translateService.instant(
		// 			'pages.customer.labels.customer-CMND-CCCD'
		// 		),
		// 		type: 'string',
		// 	},
		// 	{
		// 		field: 'customerPhone',
		// 		header: this._translateService.instant(
		// 			'pages.customer.labels.customer-phone-number'
		// 		),
		// 		type: 'string',
		// 	},
		// 	{
		// 		field: 'customerEmail',
		// 		header: this._translateService.instant(
		// 			'pages.customer.labels.customer-email'
		// 		),
		// 		type: 'string',
		// 	},

		// 	{
		// 		field: 'status',
		// 		header: this._translateService.instant(
		// 			'pages.customer.labels.status'
		// 		),
		// 		type: 'status',
		// 	},
		// ];

		this.getNewCustomerList();
	}

	async getNewCustomerList() {
		this._common.attachSpinner();
		forkJoin({
			response: this.customerService.getNewCustomerList({
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

						this.customerList = result.response.content.datas.datasList;

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

	// doDeactive(slug: string, activeStatus: number, message?: string) {
	// 	this._confirmationService.confirm({
	// 		message: message,
	// 		accept: () => {
	// 			this.companyService
	// 				.doDeactiveCompany(slug, activeStatus)
	// 				?.subscribe(
	// 					(result) => {
	// 						if (result.responseStatus === 200) {
	// 							this.presentToast(
	// 								EToastType.success,
	// 								this._translateService.instant(
	// 									result.content.message
	// 								)
	// 							);
	// 							this.getCompanyList();
	// 						} else if (result.responseStatus === 417) {
	// 							this.presentToast(
	// 								EToastType.warning,
	// 								this._translateService.instant(
	// 									result.content.message
	// 								)
	// 							);
	// 						} else {
	// 							this.presentToast(
	// 								EToastType.error,
	// 								this._translateService.instant(
	// 									result.content.message
	// 								)
	// 							);
	// 						}
	// 					},
	// 					(error) => {
	// 						console.log(error);
	// 						this.presentToast(
	// 							EToastType.error,
	// 							this._translateService.instant(
	// 								'common.errors-message.common-server-error'
	// 							)
	// 						);
	// 					}
	// 				);
	// 		},
	// 	});
	// }

	// doEdit(slug: string) {
	// 	this._common.attachSpinner();
	// 	this.customerService.getProfileCustomer(slug)?.subscribe(
	// 		(result) => {
	// 			if (result.responseStatus === 200) {
	// 				this._common.detachSpinner();
	// 				// this.openDialog(result.content.datas.companyProfile);
	// 				console.log('do edit: ', result);
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

	showModalDialog(customerNo: string, groupId: number) {
		const ref = this._dialog.open(CustomerDialogContentComponent, {
			header: this.changeHeaderDialog(groupId),
			width: '40vw',
			data: {
				isEdit: true,
				customerNo: customerNo,
				groupId: groupId,
			},
		});
		ref.onClose.subscribe((_) => this.getNewCustomerList());
	}

	changeHeaderDialog(dataGroupId: number) {
		if (dataGroupId === 1) {
			return this._translateService.instant(
				'pages.customer.labels.update-dialog-title-prime'
			);
		} else {
			return this._translateService.instant(
				'pages.customer.labels.update-dialog-title-second'
			);
		}
	}

	receiveSearch($event: any) {
		this.customerList = $event;
	}

	doVerificationCustomer(
		slug: string,
		activeStatus: number,
		message?: string
	) {
		console.log('click verify');
		this._common.attachSpinner();
		this.customerService
			.doVerificationCustomer(slug, activeStatus)
			?.subscribe(
				(result) => {
					if (result.responseStatus === 200) {
						this._common.detachSpinner();
						this.presentToast(
							EToastType.success,
							this._translateService.instant(result.content.message)
						);
						console.log('verified');
						// this.openDialog(result.content.datas.companyProfile);
						console.log('do verify: ', result);
						this.getNewCustomerList();
					} else if (result.responseStatus === 417) {
						this.presentToast(
							EToastType.warning,
							this._translateService.instant(result.content.message)
						);
						this._common.detachSpinner();
					} else {
						this.presentToast(
							EToastType.error,
							this._translateService.instant(result.content.message)
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
	}
}
