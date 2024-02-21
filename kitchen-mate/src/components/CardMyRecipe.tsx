import { removeWistlist } from "@/app/actions/wishlist";
import Link from "next/link";
import Logo from '@/assets/3.png';
import Image from 'next/image';
import Swal from "sweetalert2";

// CardMyRecipe.tsx
interface Recipe {
  _id: string;
  title: string;
  image: string;
  reciptId: number;
}


const CardMyRecipe: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  console.log(recipe.image, ">>>>>>>>>>>>>>");

  const handleDelete = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Recipe has been deleted!",
    }).then((result) => {
      if (result.isConfirmed) {
        return removeWistlist(recipe._id);
      }
    }).then(() => {
      window.location.reload();
    });
    
  }

  return (
    <div className="rounded-3xl shadow-xl mb-4" style={{ height: "380px" }}>
      <div className="grid rounded-3xl shadow-sm flex-col">
        {recipe.image ? (
          <img
            src={recipe.image}
            className="rounded-t-3xl justify-center grid h-60 object-cover w-full "
            alt={recipe.title}
          />
        ) : (
          <Image
            src={Logo}
            className="rounded-t-3xl justify-center grid h-60 object-cover w-full"
            alt={recipe.title}
          />
        )}
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
            <button className="btn btn-outline btn-error btn-sm" onClick={handleDelete}>
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMyRecipe;
