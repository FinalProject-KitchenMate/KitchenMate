import { ObjectId } from "mongodb";
import { getCollection } from "../config";
type WishlistType = {
  _id: ObjectId;
  reciptId: number;
  userId: string;
};

type InputWishList = Omit<WishlistType, "_id">;
class WishList {
  static collection() {
    return getCollection("Wishlists");
  }

  static async createWishList(body: InputWishList) {
    console.log(String(body.reciptId), "<<<<<<<<<<<");
    const result = await this.collection().insertOne({
      reciptId: body.reciptId,
      userId: new ObjectId(body.userId),
    });
    return {
      _id: result.insertedId,
      ...body,
    };
  }
}

export default WishList;
