//Route for content layout with sidebar, navbar and footer.

export const RouterService: any = {
	//Initiate Page
	initiate_system: '/home',
	//User Admin
	admin_login: '/login',
	admin_forgot_password: '/forgot-password',
	admin_reset_password: '/reset-password',

	//customer
	customer_get_list: '/list',
	customer_create: '/add',
	customer_search: '/list',
	customer_request: '/requesting',
	customer_profile: '/profile',
	customer_approve: '/approve',
	customer_delete: '/delete',
	customer_save: '/save',
	customer_verify: '/verify',
	customer_active: '/active',
	customer_deactive: '/deactive',
	customer_get_new_list: '/new/list',
	customer_get_profile: '/new/profile',
	customer_new_delete: '/delete',
	customer_update: '/update',
	customer_new_search: '/new/list',

	//qrcode
	qrcode_packing_list: '/list',
	qrcode_search: '/list',
	qrcode_create: '/add',
	qrcode_detail: '/detail',
	qrcode_delete: '/delete',
	qrcode_download: '/download',
	qrcode_deactive: '/deactive',
	qrcode_active: '/active',

	//campaign
	campaign_list: '/list',
	campaign_detail: '/detail',
	campaign_search: '/list',
	campaign_rule: '/rule',
	campaign_rule_add: '/add',
	campaign_rule_delete: '/delete',
	campaign_active: '/active',
	campaign_deactive: '/deactive',
	campaign_update_info: '/info/update',
	campaign_qrcode_history: '/qrs/history',
	campaign_delete: '/delete',
	campaign_create: '/add',
	campaign_search_qr_code: '/qrs/history',

	//product
	product_list: '/list',

	//province
	provinces: '/provinces',
	provinces_update: '/update',
	province_init_list: '/list',

	//group list

	group_init_list: '/list',

	//member list

	member_list: '/list',

	//exchange gift

	exchange_gift_list: '/list',
	// Company
	company_create: '/add',
	company_update: '/update',
	company_get_detail: '/profile',
	companies_get_list: '/list',
	company_deactive: '/de-active',
	company_delete: '/delete',
	companies_init_list: '/page/job-detail',
	company_resend_activation: '/resend-activation',

	//loyalty
	loyalty_membership_gift_list:'/list',
	loyalty_membership_gift_search:'/list',
	loyalty_membership_gift_add:'/add',
	loyalty_membership_gift_delete:'/delete',
	loyalty_membership_gift_update:'/update',
	loyalty_membership_gift_detail:'/detail',
	loyalty_membership_update:'/update',


	// /**
	//  * @author VinhNguyen
	//  **/

	// initiate_app: '/initiate/app',
	// initiate_homepage: '/initiate/pages/home',
	// initiate_jobslist: '/initiate/pages/jobs-list',
	// initiate_job_add: '/initiate/pages/job-add',
	// initiate_job_update: '/initiate/pages/job-update',

	// jobs_add: '/jobs/add',
	// jobs_delete: '/jobs/delete',
	// jobs_deactive: '/jobs/deactive',

	// jobs_get_list: '/jobs/list',
	// jobs_get_detail: '/jobs/detail',

	// candidate_login: '/auth/candidate/login',
	// candidate_register: '/auth/candidate/register',

	// candidate_forgot_password: '/auth/candidate/forgot-password',
	// candidate_reset_password: '/auth/candidate/reset-password',

	// candidate_change_password: '/candidate/change-password',
	// candidate_update_prfile: '/candidate/update-profile',
	// candidate_get_prfile: '/candidate/get-profile',

	// candidate_apply_job: '/candidate/applied-job',

	// check_existence: '/common/validation/check-existence',

	// candidate_upload_avatar: '/candidate/upload-avatar',

	// active: "/active",
	// check_new_device: "/check-new-device",
	// get_banks_list: "/get-banks-list",
	// get_postal_code_info: "/get-postal-code-info?rPCode=$0&rPType=$1",
	// get_postal_code_info_list_tree_view: "/get-postal-code-list-as-tree-view",
	// get_valid_postal_code: "/valid-postal-code?rPCode=$0",
	// // get_validate_unique: "/valid-$0?rValue=$1&rType=$2&rWithOut=$3",
	// get_requests_list: "/get-requests-list",
	// get_regulars_list: "/get-regulars-list",
	// get_request_detail: "/get-requests-detail?requestCode=$0",
	// post_update_request_status: "/request/update-status",
	// post_admin_update_request_status: "/request/admin-update-status",
	// post_update_request_like: "/request/update-like",
	// post_update_request_comment: "/request/update-comment",
	// home_info: "/info",
	// request_index: "/request",
	// upload_files: "/upload-file",
	// get_driver_location: "/user/get-driver-location?rUserId=$0",
	// get_calculate_cancel_fee: "/request/calculate-cancel-fee",
	// get_favorited_driver: "/get-favorited-driver",
	// post_delete_favorited_driver: "/delete-favorited-driver",
	// post_update_delay: "/request/add-delay",
	// post_cancel_regular: "/regular/cancel",
	// get_prefectures: "/get-prefectures",
	// get_city_by_pref_name: "/get-cities",
	// get_regular_canceled_items: "/regular/get-regular-items-canceled?requestCode=$0",

	// /**
	// * @author Nuoi
	// **/
	// // [common] get token device register on IOS
	// get_token_device_register_ios: "/token-device-register-ios?roleId=$0&apns_token=$1",

	// // Uploaf file csv
	// upload_files_csv: "/upload-file-csv",

	// admin_notification_get_list: '/list?userId=$0&userRole=$1&typeNotice=$2',
	// admin_notification_get_detail: '/detail?uId=$0&userId=$1',
	// admin_notification_post_create: '/create',
	// admin_role_get_list: '/list',
	// admin_role_post_generate: '/generate',
	// admin_role_post_create: '/create',
	// delete_user_info: "/delete",
	// get_user_item_detail: "/get-item-detail?uId=$0",
	// update_user_info_item: "/update-user-item",
	// post_notifiction_enable: "/notifiction-enable",
	// // bank info
	// edit_bank_item: "/edit-bank-item",
	// active_bank_item: "/active-bank-item",
	// default_bank_item: "/default-bank-item",
	// delete_bank_tiem: "/delete-bank-item",
	// // vehicle info
	// get_user_vehicles_item: "/get-vehicles-item",
	// add_vehicle_item: "/add-vehicle-item",
	// edit_vehicle_item: "/edit-vehicle-item",
	// active_vehicle_item: "/active-vehicle-item",
	// delete_vehicle_item: "/delete-vehicle-item",
	// default_vehicle_item: "/default-vehicle-item",
	// // licenses info
	// get_licenses_list: "/get-licenses-list",
	// add_license_item: "/add-license-item",
	// edit_license_item: "/edit-license-item",
	// active_license_iten: "/active-license-item",
	// delete_license_item: "/delete-license-item",
	// // request info
	// get_list_tabs_request: '/request-list-tabs',
	// get_request_by_id: '/get-request-by-id',

	// // regular info
	// get_list_tabs_regular: '/regular-list-tabs',

	// // Setting price option
	// get_setting_price_option_list: '/get-setting-price-option-list',
	// toggle_active_setting_price_option: '/toggle-active-setting-price-option',
	// update_setting_price_option: '/update-setting-price-option',
	// get_setting_price_option: '/get-setting-price-option',
	// create_setting_price_option: '/create-setting-price-option',

	// // setting category
	// get_setting_category_list: '/get-setting-category-list',
	// get_setting_all_category: '/get-setting-all-category',
	// toggle_active_setting_category: '/toggle-active-setting-category',
	// get_setting_value_list: '/get-setting-value-list',
	// toggle_active_setting_value: '/toggle-active-setting-value',
	// update_setting_category: '/update-setting-category',
	// update_setting_value: '/update-setting-value',
	// create_setting_value: '/create-setting-value',
	// get_setting_category_count: '/get-setting-category-count',
	// get_setting_value_count: '/get-setting-value-count',

	// /**
	//  * @author TrongThuc
	//  **/
	// admin_dashboard: '/dashboard',
	// /**
	//  * @author Huy
	//  **/
	// change_user_password: "/change-password",

	// get_notices: "/get-notices?from=$0&count=$1&filter=$2",
	// get_unread_notices: "/get-unread-notices?limitNumber=$0",
	// get_unread_notices_number: "/get-unread-notices-number",
	// update_read_notice: "/update?uId=$0",

	// get_user_info_detail: "/get-detail",
	// get_user_payment_methods: "/get-payment-methods",
	// update_user_info: "/update",
	// add_payment_method: "/add-payment-method",
	// edit_payment_method: "/edit-payment-method",
	// delete_payment_method: "/delete-payment-method",
	// active_payment_method: "/active-payment-method",
	// default_payment_method: "/default-payment-method",

	// //driver info
	// get_user_vehicles: "/get-vehicles",
	// add_vehicle: "/add-vehicle",
	// edit_vehicle: "/edit-vehicle",
	// active_vehicle: "/active-vehicle",
	// delete_vehicle: "/delete-vehicle",
	// default_vehicle: "/default-vehicle",
	// get_user_banks: "/get-banks",
	// add_bank: "/add-bank",
	// edit_bank: "/edit-bank",
	// active_bank: "/active-bank",
	// delete_bank: "/delete-bank",
	// default_bank: "/default-bank",
	// get_user_licenses: "/get-licenses",
	// add_license: "/add-license",
	// edit_license: "/edit-license",
	// active_license: "/active-license",
	// delete_license: "/delete-license",

	// /**
	//  * @author VietNgo
	//  **/
	// get_sender_payment_methods: '/user/get-payment-methods',
	// get_print_pdf: '/pdf/print-pdf?rAction=$0&rCommonSearch=$1&rItemFrom=$2&rItemLimit=$3&rSort=$4&rAccount=$5&rDate=$6&rFromDate=$7&rToDate=$8',
	// get_print_request_driver_include_child: '/pdf/print-request-driver-include-child?requestStatus=$0&requestIds=$1',
	// get_setting_price_list: '/get-setting-price-list',
	// create_setting_price: '/create-setting-price',
	// toggle_active_setting_price: '/toggle-active-setting-price',
	// update_setting_price: '/update-setting-price',
	// get_setting_price: '/get-setting-price',
	// get_export_csv: '/csv/export-accounting-list',
	// get_export_csv_detail: '/csv/export-accounting-list-detail',
	// get_setting_price_cancel_list: '/get-setting-price-cancel-list',
	// create_setting_price_cancel: '/create-setting-price-cancel',
	// toggle_active_setting_price_cancel: '/toggle-active-setting-price-cancel',
	// update_setting_price_cancel: '/update-setting-price-cancel',
	// get_setting_price_cancel: '/get-setting-price-cancel',
	// get_setting_reminder_list: '/get-setting-reminder-list',
	// create_setting_reminder: '/create-setting-reminder',
	// toggle_active_setting_reminder: '/toggle-active-setting-reminder',
	// update_setting_reminder: '/update-setting-reminder',
	// get_setting_reminder: '/get-setting-reminder',
	// get_paid_list: "/paid/get-paid-list",
	// register_member: "/paid/register-member",
	// edit_paid: "/paid/edit-paid",
	// active_paid: "/paid/active-paid",
	// delete_paid: "/paid/delete-paid",
	// check_status_member: "/paid/check-status-member",
	// check_limit_credit: "/paid/check-limit-credit",
	// get_request_regular_detail: '/regular/get-regular-detail?id=$0',
	// post_update_regular_status: "/regular/update-regular-status",
	// post_request_regular_list_with_paginate: '/request/get-regular-list-with-paginate',
	// get_current_total_point: '/point/get-current-total-point',

	// /**
	//  * @author Phu
	//  **/
	// get_payment_total: "/get-payment-total?rAction=$0&rCommonSearch=$1&rItemFrom=$2&rItemLimit=$3&rSort=$4&rAccount=$5&rDate=$6&rFromDate=$7&rToDate=$8",
	// count_payment_total: "/count-payment-total?rAccount=$0&rFromDate=$1&rToDate=$2",
	// get_driver_child: '/get-driver-child',
	// get_driver_receive_history: "/get-driver-receive-history?rAction=$0&rCommonSearch=$1&rItemFrom=$2&rItemLimit=$3&rSort=$4&rAccount=$5",
	// get_sender_payment_history: "/get-sender-payment-history?rAction=$0&rCommonSearch=$1&rItemFrom=$2&rItemLimit=$3&rSort=$4&rAccount=$5",
	// add_child_driver: "/add-child-driver",
	// delete_child_driver: "/delete-child-driver",
	// update_child_driver: "/update-child-driver",
	// get_user_invite_history: "/get-invite-history?rAction=$0&rCommonSearch=$1&rItemFrom=$2&rItemLimit=$3&rSort=$4&rType=$5&rAccount=$6",
	// insert_user_invite_history: "/insert-invite-history",
	// get_company_by_codetoken: "/get-company-by-codetoken",
	// get_company: "/get-company",
	// get_company_list: "/get-company-list",
	// send_reset_email: "/send-reset-email",
	// do_reset_passwordl: "/reset-password",
	// get_user_by_usercode: "/get-user-by-usercode",
	// change_active_user: "/change-active-user",
	// resend_active_email: "/resend",
	// send_email_pdf: '/pdf/send-email-pdf',
	// get_sender_point_history: "/get-sender-point-history?rAction=$0&rCommonSearch=$1&rItemFrom=$2&rItemLimit=$3&rSort=$4&rAccount=$5",
	// get_sender_point_remain_history: "/get-sender-point-remain-history?rAction=$0&rCommonSearch=$1&rItemFrom=$2&rItemLimit=$3&rSort=$4&rAccount=$5",
	// count_sender_point_remain_history: "/count-sender-point-remain-history?rItemLimit=$0&rAccount=$1",
};
