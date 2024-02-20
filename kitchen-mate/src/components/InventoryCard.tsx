'use client'
import React from "react";
import { InventoryType } from "@/types/type";
import { DeleteInventory, UpdateInventory } from "@/app/actions/inventory";
import Link from "next/link";

const InventoryCard = ({ item, onItemDeleted }: { item: InventoryType, onItemDeleted?: () => void }) => {

  const handleDeleteClick = async () => {
    try {
      await DeleteInventory(item._id);
      // alert("Item deleted successfully"); 
      if (onItemDeleted) onItemDeleted();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // const handleUpdateClick = async () => {
  //   try {
  //     await UpdateInventory(item._id, {}); 
  //   } catch (error) {
  //     console.error("Failed to update item:", error);
  //   }
  // };



  return (
    <div className="rounded-3xl shadow-xl mb-4" style={{ height: "380px" }}>
      <div className="grid rounded-3xl shadow-sm flex-col">
        <img src={item.images} alt={item.name} 
        className="rounded-t-3xl justify-center grid h-60 object-cover w-full " />
        
        <div className="group p-4 grid z-10">
          <h2 className="card-title mb-2">
            {item.name}
            <div className="badge badge-secondary">Stock: {item.stock} </div>
          </h2>
          <p>Expired in: {item.expired}</p>
          <div className="card-actions justify-end mt-2">
            <Link href={`/inventories/update/${item._id}`}>
              <button className="btn btn-outline btn-info btn-sm" >
                Update
              </button>
            </Link>
            <button className="btn btn-outline btn-primary btn-sm" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="grid grid-cols-4 md:grid-cols-2">
    //   <div className="card w-96 glass shadow-xl flex justify-end mt-5 mb-3">
    //     <img src={item.images} alt={item.name} className="w-full"/>
    //     <div className="card-body">
    //       <h2 className="card-title">
    //         {item.name}
    //         <div className="badge badge-secondary">Expired in: {item.expired}</div>
    //       </h2>

    //       <p>Stock Available: {item.stock}</p>
    //       <div className="card-actions justify-end">
    //         <button className="btn btn-error" onClick={handleDeleteClick}>
    //           Delete
    //         </button>
    //         <Link href={`/inventories/update/${item._id}`}>
    //         <button className="btn" >
    //           Update
    //         </button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default InventoryCard;
