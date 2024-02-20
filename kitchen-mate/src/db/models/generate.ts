// import { ObjectId } from "mongodb";
// import { getCollection } from "../config";

// type GenerateType = {
//     _id: ObjectId;
//     userId: string;
//     generate: string;
// };

// type InputGenerate = Omit<GenerateType, "_id">;

// class Generate {
//     static collection() {
//         return getCollection("Generates");
//     }

//     static async createGenerate(body: InputGenerate) {
//         const result = await this.collection().insertOne({
//             userId: new ObjectId(body.userId),
//             generate: body.generate,
//         });
//         return {
//             _id: result.insertedId,
//             ...body,
//         };
//     }
// }

// export default Generate;


import { ObjectId } from "mongodb";
import { getCollection } from "../config";

type Recipe = {
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  cuisines: string[];
  analysisInstructions: string[];
  extendIngredients: string[];
};

type GenerateType = {
  _id: ObjectId;
  userId: string;
  generate: Recipe;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  cuisines: string[];
  analysisInstructions: string[];
  extendIngredients: string[];
};

type InputGenerate = Omit<GenerateType, "_id">;

class Generate {
  static collection() {
    return getCollection("Generates");
  }

  static async createGenerate(body: InputGenerate) {
    const result = await this.collection().insertOne({
      userId: new ObjectId(body.userId),
      generate: {
        title: body.title,
        image: body.image,
        summary: body.summary,
        readyInMinutes: body.readyInMinutes,
        servings: body.servings,
        cuisines: body.cuisines,
        analysisInstructions: body.analysisInstructions,
        extendIngredients: body.extendIngredients,
      },
      title: body.title,
      image: body.image,
      summary: body.summary,
      readyInMinutes: body.readyInMinutes,
      servings: body.servings,
      cuisines: body.cuisines,
      analysisInstructions: body.analysisInstructions,
      extendIngredients: body.extendIngredients,
    });
    console.log(result.insertedId.toHexString(), 'result')
    return {
      _id: result.insertedId.toHexString(),
      ...body,
    };
    // const responseBody = {
    //     _id: result.insertedId.toHexString(),
    //     ...body,
    // };

    // return responseBody;
  }

  static async getById(generatedId: string) {
    const result = await this.collection().findOne({
      _id: new ObjectId(generatedId),
    });
    return result;
  }

}

export default Generate;
