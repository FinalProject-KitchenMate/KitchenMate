import Link from "next/link";
import React from "react";
import WishlistButton from "./WishlistButton";
export interface Result {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export default function CardResep({ recipt }: { recipt: Result }) {
  return (
    <>
      <div className='bg-white rounded-3xl shadow-xl'>
       
          <div className="grid rounded-3xl shadow-sm flex-col">
            <img
              src={recipt.image}
              className="rounded-t-3xl justify-center grid h-60 object-cover"
              alt="recipe.title"
            />

            <div className="group p-4 grid z-10">
              <button
                className="group-hover:text-cyan-700 font-bold text-sm line-clamp-2 mb-4"
              >
                {recipt.title}
              </button>
              <div className="grid-cols-2 flex group justify-between mt-1 ">
                <div className="font-black flex flex-col items-start">
                  <span className="text-sm flex gap-x-20 font-bold text-black-600 dark:text-300 transition-all duration-300 hover:text-blue-500">
                    <Link href={`/resep/${recipt.id}`} className="btn btn-outline btn-primary btn-sm">Detail Recipe</Link>
                    <WishlistButton reciptId={recipt.id} />
                  </span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
