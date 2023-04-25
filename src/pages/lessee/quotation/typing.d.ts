export interface QuotationField {
  id: number;
  tenantry_id?: number;
  equipment_id: number;
  tenantry_name?: string;
  tenantry_phone?: string;
  equipment_name: string;
  equipment_price: number;
  equipment_amount?: number;
  lease_period?: number;
  lease_rate?: number;
  total_amount?: number;
  monthly_payment?: number;
  status: '未上架' | '已上架' | '待审核' | '已审核' | '已拒绝' | '已过期';
  create_time?: Date;
  update_time?: Date;
  created_by?: string;
  updated_by?: string;
}