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
      <div >
        <div className="flex rounded-3xl shadow-sm flex-col rounded-3xl shadow-xl mb-4 " style={{ height: '380px' }}>
          <img
            src={recipt.image}
            className="rounded-t-3xl justify-center grid h-60 object-cover w-full"
            alt="recipe.title"
          />
          <div className="group p-4 flex z-10 flex-col flex-1">
            <div className="font-bold text-sm line-clamp-2 mb-4 flex flex-col  flex-1">
              {recipt.title}
            </div>
              <span className="text-sm flex gap-x-20 font-bold text-black-600 dark:text-300 transition-all duration-300 hover:text-blue-500 mt-4 justify-between">
                <Link href={`/resep/${recipt.id}`} className="btn btn-outline btn-primary btn-sm">Detail Recipe</Link>
                <WishlistButton reciptId={recipt.id} />
              </span>
          </div>
        </div>
      </div>
    </>
  );
}
