// CardMyRecipe.tsx
interface Recipe {
  recipeTitle: string;
  imageUrl: string;

}

const CardMyRecipe: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className='rounded-3xl shadow-xl mb-4' style={{ height: '380px' }}>
      <div className="grid rounded-3xl shadow-sm flex-col">
        <img
          src={recipe.imageUrl}
          className="rounded-t-3xl justify-center grid h-60 object-cover"
          alt={recipe.recipeTitle}
        />
        <div className="group p-4 grid z-10">
          <div className="font-bold text-sm line-clamp-2 mb-4">{recipe.recipeTitle}</div>
          <div className="card-actions justify-end mt-5">
            <button className="btn btn-outline btn-primary btn-sm">Detail Recipe</button>
            <button className="btn btn-outline btn-error btn-sm">Delete Recipe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMyRecipe;
