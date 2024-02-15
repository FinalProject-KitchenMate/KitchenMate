import { ObjectId } from "mongodb";

export type MyResponse<T> = {
  message?: string;
  error?: string;
  data?: T | null | undefined;
};

export type UserType = {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
};
export type NewUserInput = Omit<UserType, "_id">;

export type InventoryType = {
  _id: string;
  name: string;
  stock: string;
  images: string;
  category: string;
  tags: string[];
  expired: string;
  createdAt: string;
  updatedAt: string;
}
export type NewInventoryInput = Omit<InventoryType, "_id">;

export type InventoryResponse = {
  data: InventoryType[];
};