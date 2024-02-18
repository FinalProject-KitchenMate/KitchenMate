import { ObjectId } from "mongodb";
import { getCollection } from "../config";

type GenerateType = {
    _id: ObjectId;
    userId: string;
    generate: string;
    recipes: Recipe[];
};

type Recipe = {
    title: string;
    summary: string;
    readyInMinutes: number;
    servings: number;
    cuisines: string[];
    extendIngredients: string[];
    analyzeInstructions: string[];
};
type InputGenerate = Omit<GenerateType, "_id">;

class Generate {
    static collection() {
        return getCollection("Generates");
    }

    static async createGenerate(body: InputGenerate) {
        const result = await this.collection().insertOne({
            userId: new ObjectId(body.userId),
            generate: body.generate,
            recipes: body.recipes,
        });
        return {
            _id: result.insertedId,
            ...body,
        };
    }
}

export default Generate;
