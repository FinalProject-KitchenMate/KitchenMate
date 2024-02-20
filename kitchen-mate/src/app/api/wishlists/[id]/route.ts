import Generate from "@/db/models/generate";
import WishList from "@/db/models/wishlist";
import { NextResponse } from "next/server";

export async function POST(req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id: generatedId } = params;
        const generated = await Generate.getById(generatedId);

        // const { userId } = req.body as unknown as { userId: string };
        const userId = req.headers.get("userId") as string;
        console.log(userId);

        if (!generated) { 
            throw new Error("Generated not found");
            
        }
        const wishlist = await WishList.createWishList({
            generatedId,
            userId,
            title: generated.title,
            image: generated.image,
            summary: generated.summary,
            readyInMinutes: generated.readyInMinutes,
            servings: generated.servings,
            cuisines: generated.cuisines,
            analyzedInstructions: generated.analysisInstructions,
            extendedIngredients: generated.extendIngredients,
        });
        return NextResponse.json({ data: wishlist });

    } catch (error) {
        return {
            status: 500,
            body: {
                error: "Internal Server Error"
            }
        }
    }
}
