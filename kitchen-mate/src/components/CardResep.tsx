import Link from "next/link";
import React from "react";
export interface Result {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export default function ChatResep({ recipt }: { recipt: Result }) {

  return (
    <>
      <div className='bg-white rounded-3xl shadow-xl'>
        <Link href={`/resep/${recipt.id}`}>
          <div className="grid rounded-3xl shadow-sm flex-col">
            <img
              src={recipt.image}
              className="rounded-t-3xl justify-center grid h-60 object-cover"
              alt="movie.title"
            />

            <div className="group p-4 grid z-10">
              <button
                className="group-hover:text-cyan-700 font-bold text-sm line-clamp-2 mb-4"
              >
                {recipt.title}
              </button>
              <div className="grid-cols-2 flex group justify-between mt-1">
                <div className="font-black flex flex-col items-start">
                  <span className="text-sm flex gap-x-20 font-bold text-black-600 dark:text-300 transition-all duration-300 hover:text-blue-500">
                  <button className="btn btn-outline btn-primary btn-sm">Add To My Recipe</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
