type Nullable<T extends {}> = {
  [K in keyof T]: T[K] | null;
};

type Document = {
  document_type: string;
  document_number: string;
};

type Phone = {
  number: string;
  country_code: string;
};

type BillingAddress = {
  address_line_1: string;
  address_line_2: string;
  country: string;
  state: string;
  city: string;
  zip_code: string;
};

type ShippingAddress = {
  address_line_1: string;
  address_line_2: string;
  country: string;
  state: string;
  city: string;
  zip_code: string;
};

type Customer = {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
};

export type CustomerInput = Customer & {
  merchant_customer_id?: string;
  gender?: string;
  date_of_birth?: string;
  nationality?: string;
  document?: Partial<Document>;
  phone?: Partial<Phone>;
  billing_address?: Partial<BillingAddress>;
  shipping_address?: Partial<ShippingAddress>;
};

export type CustomerResponse = Customer & {
  id: string;
  merchant_customer_id: string;
  gender: string | null;
  date_of_birth: string | null;
  nationality: string | null;
  document: Nullable<Document> | null;
  phone: Nullable<Phone> | null;
  billing_address: Nullable<BillingAddress> | null;
  shipping_address: Nullable<ShippingAddress> | null;
  created_at: string;
  updated_at: string;
};

type CheckoutSession = {
  customer_id: string;
  merchant_order_id: string;
  payment_description: string;
  country: string;
  amount: {
    currency: string;
    value: number;
  };
};

export type CheckoutSessionInput = CheckoutSession & {
  callback_url?: string;
  metadata?: any;
};

export type CheckoutSessionResponse = CheckoutSession & {
  callback_url: string | null;
  checkout_session: string;
  created_at: Date;
  metadata: any;
  workflow: string;
};

type BrowserInfo = {
  user_agent: string;
  accept_header: string;
  color_depth: string;
  screen_height: string;
  screen_width: string;
  javascript_enabled?: string;
  language: string;
}

type Taxes = {
  type?: string;
  tax_base?: number;
  value: number;
  percentage?: number;
}

type CustomerPayer = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender?: string;
  merchant_customer_id?: string;
  nationality?: string;
  ip_address?: string;
  device_fingerprint?: string;
  browser_info?: BrowserInfo
  document?: Document;
  billing_address?: BillingAddress;
  shipping_address?: BillingAddress;
  phone?: Phone;
}

type PaymentMethod = {
  token: string;
  vaulted_token?: string;
  type?: string;
  detail?: {
    card?: {
      capture?: boolean;
      intallments?: number;
      first_installment_deferral?: number;
      soft_descriptor?: string;
      card_data?: {
        number: string;
        expiration_month: number;
        expiration_year: number;
        security_code: string;
        holder_name: string;
        type?: string;
      };
      three_d_secure?: {
        three_d_secure_setup_id?: string;
        version?: string;
        electronic_commerce_indicator?: string;
        cryptogram?: string;
        transaction_id?: string;
        directory_server_transaction_id?: string;
        verify?: boolean;
        stored_credentials?: {
          reason?: string;
          usage?: string;
        };
      };
    };
  };
  vault_on_success?: boolean;
}

type AdditionalData = {
  order?: {
    shipping_amount?: number;
    fee_amount?: number;
    tip_amount?: string;
    items?: {
      id: string;
      name: string;
      quantity: number;
      unit_amount: number;
      category: string;
      brand?: string;
      sku_code?: string;
      manufacture_part_number?: string;
    }
  };
}

type Payment = {
  account_id: string;
  description: string;
  merchant_order_id: string;
  customer_payer: CustomerPayer;
  checkout: {
    session: string;
  };
  country: string;
  amount: {
    currency: string;
    value: string;
  };
  payment_method: PaymentMethod;
  merchant_reference?: string;
  additional_data?: AdditionalData;
  workflow?: string;
  taxes?: Taxes;
  metadata?: Record<string, string>[];
  callback_url?: string
}

export type PaymentInput = Payment;

export type PaymentResponse = Payment & {
  id: string;
  status: string;
  sub_status: string;
  created_at: string;
  updated_at: string;
  amount: {
    currency: string;
    value: number;
    refunded: number;
    captured: number;
  }
};

export type ApiKeys = {
  accountCode: string;
  publicApiKey: string;
  privateSecretKey: string;
  idempotencyKey?: string;
}
