import { ObjectId } from "mongodb";
import { getCollection } from "../config";

type GenerateType = {
    _id: ObjectId;
    generate: string;
    userId: string;
};

type InputGenerate = Omit<GenerateType, "_id">;

class Generate {
    static collection() {
        return getCollection("Generates");
    }

    static async createGenerate(body: InputGenerate) {
        const result = await this.collection().insertOne({
            userId:  new ObjectId(body.userId),
            generate: body.generate,
        });
        return {
            _id: result.insertedId,
            ...body,
        };
    }
}

export default Generate;
