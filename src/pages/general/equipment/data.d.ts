export type EquipmentType = {
  id: number;
  type_name: string;
  description: string;
  image_url: string;
};
export type EquipmentInfo = {
  id: number;
  type_id: number;
  model_name: string;
  manufacturer: string;
  supplier: string;
  production_year: string;
  specifications: string;
  notes: string;
  image_url: string;
};