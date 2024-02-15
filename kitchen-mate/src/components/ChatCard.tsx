import React, { useState } from 'react';
import axios from 'axios';

export default function ChatCard() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');

  const handleGenerateRecipe = async () => {
    try {
      const response = await axios.post('/api/recipe', { ingredients });
      setRecipe(response.data.text);
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  };

  return (
    <>
      <div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Recipe Generator</div>
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="ingredients"
            >
              Ingredients
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="ingredients"
              type="text"
              placeholder="Enter ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>

          <div className="px-6 py-4">
            <button
              className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleGenerateRecipe}
            >
              Generate Recipe
            </button>
          </div>
        </div>
        {recipe && (
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Generated Recipe</div>
            <p>{recipe}</p>
          </div>
        )}
      </div>
    </>
  );
}
