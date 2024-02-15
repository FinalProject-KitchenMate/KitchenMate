// Assuming zod, getCollection, and any other necessary imports are correctly set up
import { z } from "zod";
import { getCollection } from "../config";
import { InventoryResponse, InventoryType, NewInventoryInput } from "@/types/type";
import { ObjectId } from "mongodb";

export const InventoryInputSchema = z.object({
  name: z.string(),
  stock: z.string(),
  images: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  expired: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export class InventoryModel {
  static getCollection() {
    return getCollection("Inventories");
  }

  static async Create(newInventory: NewInventoryInput) {
    const parseResult = InventoryInputSchema.safeParse(newInventory);
    if (!parseResult.success) {
      console.log(parseResult.error);
      throw parseResult.error;
    }
    return await this.getCollection().insertOne({
      ...newInventory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  static async getAll() {
    return (await this.getCollection().find().toArray());
  }

  static async Update(_id: string, updateData: Partial<NewInventoryInput>) {
    const { nModified } = await this.getCollection().updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date().toISOString() } }
    );
    if (nModified === 0) {
      throw new Error("No inventory item was updated");
    }
    return { message: "Inventory item updated successfully" };
  }

  static async Delete(_id: string) {
    const { deletedCount } = await this.getCollection().deleteOne({ _id: new ObjectId(_id) });
    if (deletedCount === 0) {
      throw new Error("No inventory item was deleted");
    }
    return { message: "Inventory item deleted successfully" };
  }
}
