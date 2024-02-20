import Link from "next/link";

// CardMyRecipe.tsx
interface Recipe {
  _id: string;
  title: string;
  image: string;
  reciptId: number;
}

const CardMyRecipe: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  console.log(recipe.image, ">>>>>>>>>>>>>>");

  return (
    <div className="rounded-3xl shadow-xl mb-4" style={{ height: "380px" }}>
      <div className="grid rounded-3xl shadow-sm flex-col">
        <img
          src={recipe.image}
          className="rounded-t-3xl justify-center grid h-60 object-cover w-full "
          alt={recipe.title}
        />
        <div className="group p-4 grid z-10">
          <div className="font-bold text-sm line-clamp-2 mb-4">
            {recipe.title}
          </div>
          <div className="card-actions justify-end mt-5">
            <Link href={`/myrecipes/${recipe._id}`}>
              <button className="btn btn-outline btn-primary btn-sm">
                Detail Recipe
              </button>
            </Link>
            <button className="btn btn-outline btn-error btn-sm">
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMyRecipe;
