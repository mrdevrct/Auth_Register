export interface UserData {
  ID: number;
  user_login: string;
  user_email: string;
  display_name: string;
  first_name: string;
  last_name: string;
  roles: string[];
  billing: BillingInfo;
  shipping: ShippingInfo;
}

export interface BillingInfo {
  billing_first_name: string;
  billing_last_name: string;
  billing_company: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_state: string;
  billing_postcode: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
}

export interface ShippingInfo {
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_company: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postcode: string;
  shipping_country: string;
}
