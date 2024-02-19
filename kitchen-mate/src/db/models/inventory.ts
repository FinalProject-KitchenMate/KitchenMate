import { z } from "zod";
import { getCollection } from "../config";
import {
  InventoryResponse,
  InventoryType,
  NewInventoryInput,
} from "@/types/type";
import { ObjectId } from "mongodb";

export const InventoryInputSchema = z.object({
  name: z.string(),
  userId: z.string(),
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

  static getUsersCollection() {
    return getCollection("Users");
  }

  static async getAll(userId: any) {
    const agg = [
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
    ];
    return await this.getCollection().aggregate(agg).toArray();
  }

  static async getById(_id: string) {
    return await this.getCollection().findOne({ _id: new ObjectId(_id) });
  }

  static async filterByCategory(userId: any, category: string) {
    const agg = [
      {
        $match: {
          userId: new ObjectId(userId),
          category: category,
        },
      },
    ];
    return await this.getCollection().aggregate(agg).toArray();
  }

  static async Create(input: NewInventoryInput): Promise<InventoryResponse> {
    const parseResult = InventoryInputSchema.safeParse(input);

    if (!parseResult.success) {
      console.log(parseResult.error);
      return {
        status: "error",
        message: parseResult.error.issues
          .map((issue) => `${issue.path.join(".")} ${issue.message}`)
          .join(", "),
      };
    }

    try {
      const usersCollection = await this.getUsersCollection();
      const user = await usersCollection.findOne({
        _id: new ObjectId(input.userId),
      });

      if (!user) {
        return {
          status: "error",
          message: "User not found",
        };
      }

      const collection = await this.getCollection();
      console.log(
        parseResult.data,
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
      const result = await collection.insertOne({
        ...parseResult.data,
        userId: new ObjectId(input.userId),
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
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      };
    }
  }

  static async Update(
    _id: string,
    updateData: Partial<NewInventoryInput>
  ): Promise<InventoryResponse> {
    try {
      const collection = await this.getCollection();
      console.log(
        updateData.stock,
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );

      console.log(_id, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      const result = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { stock: updateData.stock } }
      );
      console.log(result, ">>>>>>>>>>>>>>");
      if (!result) {
        return {
          status: "error",
          message: "Document not found or no update made",
        };
      }
      return {
        status: "success",
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during update",
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
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      };
    }
  }
}
