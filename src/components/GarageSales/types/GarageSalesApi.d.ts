export interface GarageSale {
  Object_ID: number;
  Address: string;
  Zipcode: string;
  Permit_Date: string;
  Applicances: string; // typo is in the source API
  Baby_Kid_Items: string;
  Clothing: string;
  Electronics: string;
  Entertainment: string;
  Fitness_Equipment: string;
  Furniture: string;
  Hobbies: string;
  Kitchen_Items: string;
  Lawn_Tools: string;
  Household_Items: string;
  Sporting_Goods: string;
  All_Categories: string;
  Shape: string;
}

export interface GarageSalesResponse {
  DatasetName: string;
  RecordID: number;
  Fields: { FieldID: number; FieldName: string; FieldType: string }[];
  Records: GarageSale[];
}
