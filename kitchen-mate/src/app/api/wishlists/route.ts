import WishList from "@/db/models/wishlist";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log(body.reciptId, ">>>>>>>>>>>>>>");
    const idUser = request.headers.get("userId") as string;
    // console.log(idUser, "<<<<<<<<<<<<");
    const wishlist = await WishList.createWishList({
      reciptId: body.reciptId,
      userId: idUser,
    });
    return NextResponse.json({ data: wishlist });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}
