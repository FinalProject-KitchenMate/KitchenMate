import React from "react";
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
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information`,
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
    return result;
  }
  const resep = (await ResepDetail()) as Root;
  const htmlString = resep.summary;
  return (
    <div>
      <h1> {resep.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
}
