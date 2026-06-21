import { Status } from "@/src/lib/types/types";

export interface ICategory {
  id: string;
  catagoryName: string;
  catagoryDescription: string;
  createdAt: string;
}

export interface ICreateCategoryData {
  catagoryName: string;
  catagoryDescription: string;
}

export interface IEditCategoryPayload {
  id: string;
  data: Partial<Omit<ICategory, "id">>;
}

export interface IInitialCategoryData {
  categories: ICategory[];
  status: Status;
}
