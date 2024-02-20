'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '@/assets/3.png';
import Image from 'next/image';

interface InventoryType {
  _id: string;
  userId: string;
  name: string;
  stock: string;
  images: string;
  category: string;
  tags: string[];
  expired: string;
  createdAt: string;
  updatedAt: string;
}

const GeneratePage = () => {
  const [addToMyRecipeStatus, setAddToMyRecipeStatus] = useState<string | null>(null);
  const [generatedRecipeId, setGeneratedRecipeId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [promtIngredients] = useState('Make recommendations for 1 food recipes based on the following ingredients:');
  const [ingredients, setIngredients] = useState('');
  const [promtMealType] = useState('and meal type');
  const [mealType, setMealType] = useState('Breakfast');
  const [promtCookingTime] = useState(',cooking time for');
  const [cookingTime, setCookingTime] = useState('Less than 5 minutes');
  const [promtFind] = useState(`, Provide it in JSON answer format, which consists of properties: 
  1. title (recipe title string), 
  2. image (string yang berisi null),
  3. summary (string),
  4. readyInMinutes (number), 
  5. servings (number),
  6. cuisines (string[] for country),
  7. analysisInstructions(string[{instruction:}] for specific step-by-step Instructions),
  8. extendIngredients(string[{ingredient:}] to display what Ingredients are needed)`);

  const [outputJSON, setOutputJSON] = useState<any>('null');
  console.log(outputJSON, "outputJSON");
  const [inventoryList, setInventoryList] = useState<InventoryType[]>([]);
  console.log(promtIngredients, ingredients, promtMealType, mealType, promtCookingTime, cookingTime, promtFind,);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const combinedInput = `${promtIngredients.trim()}, ${ingredients.trim()}, ${promtMealType.trim()}, ${mealType.trim()}, 
      ${promtCookingTime.trim()}, ${cookingTime.trim()}, ${promtFind.trim()},`;

      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/api/generate', {
        messages: combinedInput
      });
      console.log(response, "response.data");

      const generatedRecipe = response.data.text.generate;
      console.log(generatedRecipe, "generatedRecipe");


      const generatedRecipeIdFromServer = response.data.text._id;
      console.log(generatedRecipeIdFromServer, "generatedRecipeIdFromServer");


      setGeneratedRecipeId(generatedRecipeIdFromServer);

      // setOutputJSON(response.data.text.generate);
      setOutputJSON(response.data.text.generate)
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToMyRecipe = async () => {
    try {
      if (!generatedRecipeId) {
        console.error('No generated recipe id found.');
        return;
      }
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlists/${generatedRecipeId}`, {
        recipeData: outputJSON
      });
      console.log(response)

      setAddToMyRecipeStatus('success');
    } catch (error) {
      console.error('Error while adding to My Recipe:', error);
      setAddToMyRecipeStatus('error');
    }
  };

  useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await axios.get("http://localhost:3000/api/inventories/list");
        console.log(response.data, "response.data");

        setInventoryList(response.data.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    }
    fetchInventory();
  }, []);

  const htmlString = outputJSON?.summary;
  return (
    <>
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full  border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
          <ul className="space-y-2 font-medium mt-4">
            <li>
              <div>
                <h1>Generate Your Recipe</h1>
                <div>
                  <label className="form-control w-full max-w-xs mb-4 mt-4">
                    <div className="label">
                      <span className="label-text"><b>Ingredients</b></span>
                    </div>

                    {inventoryList.map((item) => (
                      <div className="flex items-center mb-4" key={item._id}>
                        <input
                          type="checkbox"
                          id={item._id}
                          value={item.name}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setIngredients((prev) => `${prev} ${e.target.value},`);
                            } else {
                              setIngredients((prev) => prev.replace(e.target.value, ''));
                            }
                          }}
                        />
                        <label htmlFor={item._id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.name}</label>
                      </div>
                    ))}

                  </label>

                  <label className="form-control w-full max-w-xs mb-4">
                    <div className="label">
                      <span className="label-text"><b>Meal Type</b></span>
                    </div>
                    <select className="select select-bordered" value={mealType} onChange={(e) => setMealType(e.target.value)}>
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                      <option>Snack</option>
                    </select>
                  </label>

                  <label className="form-control w-full max-w-xs mb-4">
                    <div className="label">
                      <span className="label-text"><b>Cooking Time</b></span>
                    </div>
                    <select className="select select-bordered" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)}>
                      <option>Less than 30 minutes</option>
                      <option>30-60 minutes</option>
                      <option>More than 1 hour</option>
                    </select>
                  </label>
                </div>
                <div className="card-actions justify-end mt-5">
                  <button className="btn btn-outline btn-primary btn-sm" onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className='card-actions flex justify-between items-center'>
          <h1 className='text-xl'>Your Recipe</h1>
          <div>
            <button className="btn btn-outline btn-primary btn-sm" onClick={handleAddToMyRecipe}>
              Add to My Recipe
            </button>
          </div>
        </div>

        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-7">
          {loading ? (
            <div>Loading...</div>
          ) : 
            outputJSON ? (
              <div className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-l">
                <Image
                  className="object-cover w-full max-w-[400px] rounded-t-lg h-96 md:h-auto md:w-full md:rounded-none md:rounded-s-lg mt-6 "
                  src={Logo} alt="Logo" width={200} height={80}

                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {outputJSON.title}
                  </h5>
                  <p
                    className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: htmlString }}
                  ></p>
                  <div className="flex items-center mb-3">
                    <ul>
                      <li className="text-gray-600 dark:text-gray-400">
                        <b>Ready in: </b>
                        {outputJSON.readyInMinutes} Minutes
                      </li>
                      <li className="text-gray-600 dark:text-gray-400">
                        <b>Servings: </b>
                        {outputJSON.servings} Servings
                      </li>
                      <li className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-5">
                        Ingredients :
                      </li>
                      {outputJSON?.extendIngredients?.map((item) => (
                        <>
                          <p>{item.ingredient}</p>
                        </>
                      ))}
                      <li className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-5">
                        Instructions :
                      </li>

                      {outputJSON?.analysisInstructions?.map((item) => (
                        <>
                          <p>{item.instruction}</p>

                        </>
                      ))}

                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div>No recipe generated yet.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default GeneratePage;
