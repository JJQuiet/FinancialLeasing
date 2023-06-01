export type EquipmentType = {
  id: number;
  type_name: string;
};

export type EquipmentInfo = {
  id: number;
  model_number: string;
  type_id: number;
  manufacturer: string;
  specifications: string;
  supplier: string;
  production_year: string;
  notes: string;
  image_url: string;
};