"use client";
import { InventoryType } from "@/types/type";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function ButtonAddToWishlist({ item, productById }: { item?: InventoryType; productById: any }) {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  // Check if the item is in the wishlist on component mount
  useEffect(() => {
    const wishlist = Cookies.get('wishlist') ? JSON.parse(Cookies.get('wishlist')) : [];
    setIsInWishlist(wishlist.includes(productById.id));
  }, [productById.id]);

  const addToWishlist = async () => {
    let wishlist = Cookies.get('wishlist') ? JSON.parse(Cookies.get('wishlist')) : [];

    if (!wishlist.includes(productById.id)) {
      wishlist.push(productById.id);
      Cookies.set('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true);

      Swal.fire({
        icon: 'success',
        title: 'Added to Wishlist',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <button className={`mt-4 flex items-center text-red-500 hover:text-red-700 focus:outline-none ${isInWishlist ? "text-red-700" : ""}`} onClick={addToWishlist} disabled={isInWishlist}>
      <FontAwesomeIcon icon={faHeart} className="mr-2" />
      {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
    </button>
  );
}