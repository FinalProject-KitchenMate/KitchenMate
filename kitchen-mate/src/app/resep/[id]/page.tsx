import React from "react";
import DisqusComments from "@/components/disqus-comments";
export interface ResepDetailType {
  params: {
    id: number;
  };
}

export interface Root {
  extendedIngredients: ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  originalId: any;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: Measures;
}

export interface Measures {
  us: Us;
  metric: Metric;
}

export interface Us {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Metric {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

export interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length?: Length;
}

export interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
  temperature?: Temperature;
}

export interface Temperature {
  number: number;
  unit: string;
}

export interface Length {
  number: number;
  unit: string;
}

export default async function ResepDetail({ params }: ResepDetailType) {
  async function ResepDetail() {
    const res = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information`, {
      headers: {
        "x-api-key": "32ab990db30641cb99a50948f6caecd6",
      },
    });
    if (!res.ok) {
      throw new Error("Failed fetch");
    }
    const result = await res.json();
    return result;
  }
  const resep = (await ResepDetail()) as Root;
  const htmlString = resep.summary;

  return (
    <>
      <div className="p-4 flex items-center justify-center">
        <div className="p-8 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-l">
            <img
              className="object-cover w-full max-w-[400px] rounded-t-lg h-96 md:h-auto md:w-full md:rounded-none md:rounded-s-lg mt-6 "
              src={resep.image}
              alt={resep.title}
              // style={{ position: "fixed", top: "50%", transform: "translateY(-50%)" }}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{resep.title}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: htmlString }}></p>
              <div className="flex items-center mb-3">
                <ul>
                  <li className="text-gray-600 dark:text-gray-400">
                    <b>Ready in: </b>
                    {resep.readyInMinutes} minutes
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    <b>Servings: </b>
                    {resep.servings}
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    <b>Country: </b>
                    {resep.cuisines[0]}, {resep.cuisines[1]}
                  </li>

                  <li className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black mt-5">Ingredients :</li>
                  {resep.extendedIngredients.map((item) => (
                    <li key={item.id} className="text-gray-600 dark:text-gray-400">
                      {item.original}
                    </li>
                  ))}
                  <li className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black mt-5">Instructions :</li>
                  {resep.analyzedInstructions[0].steps.map((item) => (
                    <li key={item.number} className="text-gray-600 dark:text-gray-400">
                      {item.number} . {item.step}
                    </li>
                  ))}
                  <li className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black mt-10">Comment :</li>
                  <li className="text-gray-600 dark:text-gray-400">
                    <DisqusComments recipt={resep} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
