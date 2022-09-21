import { Component, Input, OnInit } from '@angular/core';
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
import { DialogService } from 'primeng/dynamicdialog';
import { forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CustomerDialogDetailContentComponent } from '../customer-dialog-detail-content/customer-dialog-detail-content.component';
import { CustomerUpdateComponent } from '../customer-update/customer-update.component';

@Component({
	selector: 'app-customer-list',
	templateUrl: './customer-list.component.html',
	styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent extends BaseComponent {
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

	@Input() cols!: ColumnsTableDto[];
	public listSelect!: CompanyDto[];

	isTest!: boolean;

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
			this._translateService.instant('pages.customer.labels.page-title')
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
				field: 'status',
				header: this._translateService.instant(
					'pages.customer.labels.status'
				),
				type: 'status',
			},
		];
		this.getCustomerList();
	}

	async getCustomerList() {
		this._common.attachSpinner();
		forkJoin({
			response: this.customerService.getCustomerList({
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

	doDeactive(slug: string, activeStatus: number, message?: string) {
		this._confirmationService.confirm({
			message: message,
			accept: () => {
				this.customerService
					.doDeactiveCustomer(slug, activeStatus)
					?.subscribe(
						(result) => {
							if (result.responseStatus === 200) {
								this.presentToast(
									EToastType.success,
									this._translateService.instant(
										result.content.message
									)
								);
								this.getCustomerList();
							} else if (result.responseStatus === 417) {
								this.presentToast(
									EToastType.warning,
									this._translateService.instant(
										result.content.message
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

	doActive(slug: string, activeStatus: number, message?: string) {
		this._confirmationService.confirm({
			message: message,
			accept: () => {
				this.customerService
					.doActiveCustomer(slug, activeStatus)
					?.subscribe(
						(result) => {
							if (result.responseStatus === 200) {
								this.presentToast(
									EToastType.success,
									this._translateService.instant(
										result.content.message
									)
								);
								this.getCustomerList();
							} else if (result.responseStatus === 417) {
								this.presentToast(
									EToastType.warning,
									this._translateService.instant(
										result.content.message
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

	doEdit(slug: string) {
		this._common.attachSpinner();
		this.customerService.getProfileCustomer(slug)?.subscribe(
			(result) => {
				if (result.responseStatus === 200) {
					this._common.detachSpinner();
					// this.openDialog(result.content.datas.companyProfile);
					console.log('do edit: ', result);
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

	doDelete(customerNo: string, message?: string) {
		this._confirmationService.confirm({
			message: message,
			accept: () => {
				this.customerService.doDeleteCustomer(customerNo)?.subscribe(
					(result) => {
						if (result.responseStatus === 200) {
							this.presentToast(
								EToastType.success,
								this._translateService.instant(result.content.message)
							);
						} else if (result.responseStatus == 417) {
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
									result.statusText as string
								)
							);
						}
					},
					(error) => {
						this.presentToast(
							EToastType.error,
							this._translateService.instant(error)
						);
					}
				);
			},
		});
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
		const ref = this._dialog.open(CustomerUpdateComponent, {
			header: this.changeHeaderDialog(groupId),
			width: '40vw',
			data: {
				isEdit: true,
				customerNo: customerNo,
				groupId: groupId,
			},
		});
		ref.onClose.subscribe((_) => this.getCustomerList());
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
}
