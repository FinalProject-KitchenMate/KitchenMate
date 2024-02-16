"use client";
import { InventoryType } from "@/types/type";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function ButtonAddToWishlist({ item }: { item: InventoryType }) {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  // Ensure item._id is defined before using it
  useEffect(() => {
    if (item && item._id) {
      const wishlist = Cookies.get('wishlist') ? JSON.parse(Cookies.get('wishlist')) : [];
      const itemId = item._id.toString(); // Safely convert _id to string
      setIsInWishlist(wishlist.includes(itemId));
    }
  }, [item]);

  const addToWishlist = async () => {
    if (item && item._id) {
      let wishlist = Cookies.get('wishlist') ? JSON.parse(Cookies.get('wishlist')) : [];
      const itemId = item._id.toString(); // Safely convert _id to string

      if (!wishlist.includes(itemId)) {
        wishlist.push(itemId);
        Cookies.set('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(true);

        // Show success notification
        Swal.fire({
          icon: 'success',
          title: 'Added to Wishlist',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  return (
    <button 
      className={`mt-4 flex items-center text-red-500 hover:text-red-700 focus:outline-none ${isInWishlist ? "text-red-700" : ""}`} 
      onClick={addToWishlist} 
      disabled={isInWishlist}
    >
      <FontAwesomeIcon icon={faHeart} className="mr-2" />
      {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
    </button>
  );
}
