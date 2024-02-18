'use client'
import { useState } from 'react';
import axios from 'axios';

const GeneratePage = () => {
  const [promtIngredients] = useState('Make recommendations for 5 food recipes based on the following ingredients:');
  const [ingredients, setIngredients] = useState('');
  const [promtMealType] = useState('and meal type');
  const [mealType, setMealType] = useState('Breakfast');
  const [promtCookingTime] = useState(',cooking time for');
  const [cookingTime, setCookingTime] = useState('Less than 5 minutes');
  const [promtFind] = useState(`, Provide it in JSON answer format, which consists of properties: 
  1. title (recipe title string), 
  2. summary (string),
  3. readyInMinutes (number), 
  4. servings (number),
  5. cuisines (string[] for country),
  6. extendIngredients(string[] to display what Ingredients are needed),
  7. analyzeInstructions(string[] for Instructions step by step)`);

  const [outputJSON, setOutputJSON] = useState('null');
  console.log(promtIngredients, ingredients, promtMealType, mealType, promtCookingTime, cookingTime, promtFind,);

  const handleSubmit = async () => {
    try {
      const combinedInput = `${promtIngredients.trim()}, ${ingredients.trim()}, ${promtMealType.trim()}, ${mealType.trim()}, 
      ${promtCookingTime.trim()}, ${cookingTime.trim()}, ${promtFind.trim()},`;

      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/api/generate', {
        messages: combinedInput
      });


      const generatedRecipe = JSON.parse(response.data.text);

      console.log(generatedRecipe, "generatedRecipe");


      // setIngredients(generatedRecipe.recipe.ingredients.join(', '));
      // setMealType(generatedRecipe.recipe.mealType || 'Unknown');
      // setCookingTime(generatedRecipe.recipe.cookingTime || 'Unknown');
      // setOutputJSON(generatedRecipe);

      setOutputJSON(response.data.text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
                    <input
                      type="text"
                      placeholder="rice, egg, onion"
                      className="input input-bordered w-full max-w-xs"
                      value={ingredients} onChange={(e) => setIngredients(e.target.value)}
                    />
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
            <button className="btn btn-outline btn-secondary btn-sm">Save To My Recipe</button>
          </div>
        </div>

        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-7">
          {outputJSON && (
            <div>
              <h2>Response:</h2>
              {/* <p>{JSON.stringify(outputJSON, null, 2)}</p> */}
              <p>{outputJSON}</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default GeneratePage;
