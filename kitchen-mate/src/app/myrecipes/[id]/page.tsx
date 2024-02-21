import { cookies } from "next/headers";
import Logo from '@/assets/3.png';
import Image from 'next/image';

export interface ResepDetailType {
  params: {
    id: number;
  };
}

export interface ResepDetailType {
  data: Root[];
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
  ingredient?: string;
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
  step: Step[];
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

export default async function MyRecipeDetail({ params }: ResepDetailType) {
  async function MyRecipeDetail() {
    const res = await fetch(
      `http://localhost:3000/api/myrecipes/${params.id}`,
      {
        headers: {
          Cookie: cookies().toString(),
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed fetch");
    }
    const result = await res.json();
    return result;
  }
  const resep = (await MyRecipeDetail()) as ResepDetailType;
  console.log(resep.data[0].analyzedInstructions[0], "ini resep");
  const htmlString = resep?.data[0].summary;
  return (
    <>
      <div className="p-4 flex items-center justify-center">
        <div className="p-8 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-l">
            {resep.data[0].image ? (
              <img
                className="object-cover w-full max-w-[400px] rounded-t-lg h-96 md:h-auto md:w-full md:rounded-none md:rounded-s-lg mt-6 "
                src={resep.data[0].image}
                alt={resep.data[0].title}
              />
            ) : (
              <Image
                className="object-cover w-full max-w-[400px] rounded-t-lg h-96 md:h-auto md:w-full md:rounded-none md:rounded-s-lg mt-6 "
                src={Logo}
                alt={resep.data[0].title}
              />
            )}
            {/* )
            <Image
              className="object-cover w-full max-w-[400px] rounded-t-lg h-96 md:h-auto md:w-full md:rounded-none md:rounded-s-lg mt-6 "
              src={resep.data[0].image || Logo}
              alt={resep.data[0].title}
            /> */}
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {resep.data[0].title}
              </h5>
              <p
                className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: htmlString }}
              ></p>
              <div className="flex items-center mb-3">
                <ul>
                  <li className="text-gray-600 dark:text-gray-400">
                    <b>Ready in: </b>
                    {resep.data[0].readyInMinutes} minutes
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    <b>Servings: </b>
                    {resep.data[0].servings}
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    <b>Country: </b>
                    {resep.data[0].cuisines}
                  </li>
                  <li className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-5">
                    Ingredients :
                  </li>
                  {resep.data[0].extendedIngredients.map((item) => (
                    <li
                      key={item.id}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      {item.original ? item.original : item.ingredient}
                    </li>
                  ))}
                  <li className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-5">
                    Instructions :
                  </li>

                  {resep.data[0].reciptId && 
                    
                      resep.data[0].analyzedInstructions[0].map((item:<) => (
                        <li
                          key={item.number}
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {item.number} . {item.step}
                        </li>
                      ))
                    
                  }

                  {!resep.data[0].reciptId && 
                    
                      resep.data[0].analyzedInstructions.map((item) => (
                        <li
                          key={item.step}
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {item.step} . {item.instruction}
                        </li>
                      ))
                  }

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
