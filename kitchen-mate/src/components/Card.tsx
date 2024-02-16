import Link from "next/link";
import React from "react";
import WishlistButton from "./WishlistButton";
export interface Result {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

const Card = ({ recipt }: { recipt: Result }) => {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
      <WishlistButton reciptId={recipt.id} />
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
        <img src={recipt.image} alt="profile-picture" />
      </div>
      <div className="p-6 text-center">
        <Link href={`/resep/${recipt.id}`}>
          <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {recipt.title}
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default Card;
