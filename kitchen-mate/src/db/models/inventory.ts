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
  
  static async getAll() {
      return (await this.getCollection().find().toArray());
  }

  static async Create(input: NewInventoryInput): Promise<InventoryResponse> {
    const parseResult = InventoryInputSchema.safeParse(input);
    if (!parseResult.success) {
      console.log(parseResult.error);
      return {
        status: "error",
        message: parseResult.error.issues.map(issue => `${issue.path.join('.')} ${issue.message}`).join(', ')
      };
    }
  
    try {
      const collection = await this.getCollection();
      const result = await collection.insertOne({
        ...parseResult.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return {
        status: "success",
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      };
    }
  }

  static async Update(_id: string, updateData: Partial<NewInventoryInput>): Promise<InventoryResponse> {
    try {
        const collection = await this.getCollection();
        const result = await collection.findOneAndUpdate(
          { _id: new ObjectId(_id) },
          { $set: { ...updateData, updatedAt: new Date() } },
          { returnDocument: 'after' }
        );
    
        if (!result) {
          return {
            status: "error",
            message: "Document not found or no update made",
          };
        }
        return {
          status: "success",
          data: result.value,
        };
      } catch (error) {
        console.log(error);
        return {
          status: "error",
          message: error instanceof Error ? error.message : "An unexpected error occurred during update",
        };
      }
  }

  static async Delete(_id: string): Promise<InventoryResponse> {
    try {
        const collection = await this.getCollection();
        const result = await collection.deleteOne({ _id: new ObjectId(_id) });
    
        if (result.deletedCount === 0) {
          return {
            status: "error",
            message: "No document found with the provided _id",
          };
        }
        return {
          status: "success",
          message: "Document successfully deleted",
        };
      } catch (error) {
        console.error(error);
        return {
          status: "error",
          message: error instanceof Error ? error.message : "An unexpected error occurred",
        };
      }
  }
  
}
