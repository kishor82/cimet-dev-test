export type TokenData = {
  token: string;
  token_expire_time: string;
};

export interface ElectricityPlan {
  id: string;
  title: string;
  description: string;
  planName: string;
  provider_image: string;
  provider_name: string;
  dmo_content: {
    Ausgrid: string;
  };
  dmo_percentage: {
    Ausgrid: string;
  };
  plan_name_below_data: string;
  why_us: string;
  energy_type: string;
  solar_compatible: string;
  view_discount: string;
  view_benefit: string;
  view_bonus: string;
  view_contract: string;
  view_exit_fee: string;
  expected_bill_amount: number;
  expected_monthly_bill_amount: number;
  [key: string]: any;
}

export interface ElectricityPlansResponse {
  status: number;
  message: string;
  data: {
    electricity: ElectricityPlan[];
  };
}
