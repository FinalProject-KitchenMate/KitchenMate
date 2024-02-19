import { ObjectId } from "mongodb";
import { getCollection } from "../config";

export type WishlistType = {
  _id: ObjectId;
  generatedId?: string;
  reciptId?: number;
  userId: string;
  title: string;
  image: string;
  summary: string;
  readyInMinutes?: number;
  servings: number;
  cuisines?: string[];
  analyzedInstructions: string[];
  extendedIngredients: string[];
};

type InputWishList = Omit<WishlistType, "_id">;
class WishList {
  static collection() {
    return getCollection("Wishlists");
  }

  static async createWishList(body: InputWishList) {
    // console.log(String(body.reciptId), "<<<<<<<<<<<");
    const result = await this.collection().insertOne({
      reciptId: body.reciptId,
      userId: new ObjectId(body.userId),
      generatedId: new ObjectId(body.generatedId),
      title: body.title,
      image: body.image,
      summary: body.summary,
      readyInMinutes: body.readyInMinutes,
      servings: body.servings,
      cuisines: body.cuisines,
      analyzedInstructions: body.analyzedInstructions,
      extendedIngredients: body.extendedIngredients,
    });
    return {
      _id: result.insertedId,
      ...body,
    };
  }

  static async getMyRecipes(userId: string) {
    const result = await this.collection()
      .find({ userId: new ObjectId(userId) })
      .toArray();
    return result;
  }

}

export default WishList;
