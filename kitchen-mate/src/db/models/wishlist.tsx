import { ObjectId } from "mongodb";
import { getCollection } from "../config";
type WishlistType = {
  _id: ObjectId;
  reciptId: number;
  userId: string;
  title: string;
  image: string;
  summary: string;
  servings: number;
  analyzedInstructions: [];
  extendedIngredients: [];
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
      title: body.title,
      image: body.image,
      summary: body.summary,
      servings: body.servings,
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
