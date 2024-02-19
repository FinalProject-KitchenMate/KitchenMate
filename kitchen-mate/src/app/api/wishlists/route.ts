import WishList from "@/db/models/wishlist";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log(body, ">>>>>>>>>>>>>>");
    const idUser = request.headers.get("userId") as string;
    // console.log(idUser, "<<<<<<<<<<<<");
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${body}/information`,
      {
        headers: {
          "x-api-key": "32ab990db30641cb99a50948f6caecd6",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed fetch");
    }
    const result = await res.json();
    const {
      title,
      image,
      summary,
      servings,
      analyzedInstructions,
      extendedIngredients,
    } = result;
    // console.log(summary, ">>>>>>>>>>>>>>");
    const wishlist = await WishList.createWishList({
      reciptId: body,
      userId: idUser,
      title: title,
      image: image,
      summary: summary,
      servings: servings,
      analyzedInstructions: analyzedInstructions.map((item: any) => item.steps),
      extendedIngredients: extendedIngredients,
    });
    return NextResponse.json({ data: wishlist });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}

export async function GET(request: Request) {
  try {
    const idUser = request.headers.get("userId") as string;
    const myRecipes = await WishList.getMyRecipes(idUser);
    return NextResponse.json({ data: myRecipes });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
