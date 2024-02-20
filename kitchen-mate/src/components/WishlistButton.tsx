import { addWistlist } from "@/app/actions/wishlist";
import Swal from "sweetalert2";


export default function WishlistButton({ reciptId }: { reciptId: number }) {
  const handleWishlist = () => {
    Swal.fire({
      title: "Success!",
      text: "Successfully added to wishlist!",
      icon: "success"
    });

    addWistlist(reciptId);
  } 

  const buttonStyle = `
    .button:hover .svg-icon {
      fill: red;
    }
  `;

  return (
    <>
      <style>{buttonStyle}</style>

      <button
        onClick={handleWishlist}
        type="button"
        className="font-semibold text-gray-500 text-sm flex items-center gap-2 shrink-0 hover:text-blue-500 button"
      >
        <svg className="w-10 h-10 text-red-500 dark:text-white svg-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
        </svg>
      </button>
    </>
  );
}
