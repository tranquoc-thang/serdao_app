export interface User {


  // id: number;
  // role_code: number;
  // user_group_id: number;
  // user_account_id: number;
  // reference_parent_id: number;
  username: string;
  // email: string;
  // password: string;
  // last_login: Date;
  // remember_token: string;
  // is_verify_email: boolean;
  // is_active: boolean;
  // name_1: string;
  // name_2: string;
  // kana_name_1: string;
  // kana_name_2: string;
  // postcode: string;
  // prefecture_id: number;
  // city_id: number;
  // address: string;
  // building_name: string;
  // phone: string;
  // is_verify_phone: boolean;
  // age: number;
  // account_type: number;
  company_name: string;
  // industry_id: number;
  // image_url: string;
  // member_type: number;
  // point_amount: number;
  // total_spent_amount: number;
  // total_cancel_amount: number;
  // last_position_json: number;
  // last_position_updated_at: number;
}

export interface NewUser {
  roleId: string;


  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  lastLogin: Date;

  name1: string;
  name2: string;
  kanaName1: string;
  kanaName2: string;
  postcode: string;
  phone: string;
  isVerifyPhone: number;
  age: number;
  prefectureId: string;
  cityId: string;
  address: string;
  buildingName: string;

  accountType: number;
  companyName: string;
  companyPrefecture: string;
  companyCity: string;
  companyAddress: string;
  companyPhone: string;
  industryId: number;

  imageUrl: string;
  memberType: number;
  pointAmount: number;
  totalAmount: number;
  totalCancelAmount: number;

}
