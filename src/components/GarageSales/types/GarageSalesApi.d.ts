// Raw record arrays ordered by Fields index
export type GarageSale = string[];

export interface SaleRecord {
  id: string;
  address: string;
  zipcode: string;
  permitDate: string;
  appliances: string;
  babyKidItems: string;
  clothing: string;
  electronics: string;
  entertainment: string;
  fitnessEquipment: string;
  furniture: string;
  hobbies: string;
  kitchenItems: string;
  lawnTools: string;
  householdItems: string;
  sportingGoods: string;
  allCategories: string;
  shape: string;
}

export interface GarageSalesResponse {
  DatasetName: string;
  RecordID: number;
  Fields: { FieldID: number; FieldName: string; FieldType: string }[];
  Records: GarageSale[];
}
