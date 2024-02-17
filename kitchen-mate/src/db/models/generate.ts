import { ObjectId } from "mongodb";
import { getCollection } from "../config";

type GenerateType = {
    _id: ObjectId;
    generate: Recipe;
    userId: string;
};

type Recipe = {
    name: string;
    ingredients: string[];
    instructions: string;
    cookingTime?: string;
    mealType?: string;
  };
  
//   type GenerateType = {
//     _id: ObjectId;
//     userId: string;
//     recipe: Recipe;
//   };

type InputGenerate = Omit<GenerateType, "_id">;

class Generate {
    static collection() {
        return getCollection("Generates");
    }

    static async createGenerate(body: InputGenerate) {
        const result = await this.collection().insertOne({
            userId:  new ObjectId(body.userId),
            generate: body.generate,
            // recipe: {
            //     name: body.recipe.name,
            //     ingredients: body.recipe.ingredients,
            //     cookingTime: body.recipe.cookingTime,
            //     mealType: body.recipe.mealType,
            //   },
        });
        return {
            _id: result.insertedId,
            ...body,
        };
    }
}

export default Generate;


