import WishList from "@/db/models/wishlist";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const idUser = request.headers.get("userId") as string;
    const wishlist = await WishList.getMyRecipesById(id);
    // console.log(wishlist, "wishlist");
    return NextResponse.json({ data: wishlist });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

