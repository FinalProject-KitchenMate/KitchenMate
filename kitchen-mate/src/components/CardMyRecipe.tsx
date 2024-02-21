// import { removeWistlist } from "@/app/actions/wishlist";
// import Link from "next/link";
// import Logo from '@/assets/3.png';
// import Image from 'next/image';
// import Swal from "sweetalert2";

// // CardMyRecipe.tsx
// interface Recipe {
//   _id: string;
//   title: string;
//   image: string;
//   reciptId: number;
// }


// const CardMyRecipe: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
//   console.log(recipe.image, ">>>>>>>>>>>>>>");

//   const handleDelete = () => {
//     Swal.fire({
//       icon: "success",
//       title: "Success",
//       text: "Recipe has been deleted!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         return removeWistlist(recipe._id);
//       }
//     }).then(() => {
//       window.location.reload();
//     });
    
//   }

//   return (
//     <div className="rounded-3xl shadow-xl mb-4" style={{ height: "380px" }}>
//       <div className="grid rounded-3xl shadow-sm flex-col">
//         {recipe.image ? (
//           <img
//             src={recipe.image}
//             className="rounded-t-3xl justify-center grid h-60 object-cover w-full "
//             alt={recipe.title}
//           />
//         ) : (
//           <Image
//             src={Logo}
//             className="rounded-t-3xl justify-center grid h-60 object-cover w-full"
//             alt={recipe.title}
//           />
//         )}
//         <div className="group p-4 grid z-10">
//           <div className="font-bold text-sm line-clamp-2 mb-4">
//             {recipe.title}
//           </div>
//           <div className="card-actions justify-end mt-5">
//             <Link href={`/myrecipes/${recipe._id}`}>
//               <button className="btn btn-outline btn-primary btn-sm">
//                 Detail Recipe
//               </button>
//             </Link>
//             <button className="btn btn-outline btn-error btn-sm" onClick={handleDelete}>
//               Delete Recipe
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardMyRecipe;

import { removeWistlist } from "@/app/actions/wishlist";
import Link from "next/link";
import Logo from '@/assets/logo-card.png';
import Image from 'next/image';
import Swal from "sweetalert2";

// Assuming the Recipe interface is imported or defined elsewhere
interface Recipe {
  _id: string;
  title: string;
  image: string;
  reciptId: number;
}

const CardMyRecipe: React.FC<{ recipe: Recipe }> = ({ recipe }) => {

  const handleDelete = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Recipe has been deleted!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeWistlist(recipe._id).then(() => {
          window.location.reload(); // Consider using a more React-friendly approach
        });
      }
    });
  }

  return (
    <div className="max-w-sm rounded-3xl shadow-xl mb-4 overflow-hidden">
      <div className="flex flex-col">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-60 w-full object-cover"
          />
        ) : (
          <Image
            src={Logo}
            alt={recipe.title}
            width={500} // Specify width
            height={300} // Specify height, adjust as necessary
            className="object-cover h-60 w-full"
          />
        )}
        <div className="p-4">
          <h5 className="text-lg font-bold mb-2">{recipe.title}</h5>
          <div className="flex justify-end space-x-2">
            <Link href={`/myrecipes/${recipe._id}`} passHref>
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

