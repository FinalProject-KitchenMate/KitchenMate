'use client'
import React from "react";
import { InventoryType } from "@/types/type";
import { DeleteInventory, UpdateInventory } from "@/app/actions/inventory";

const InventoryCard = ({ item }: {item: InventoryType}) => {

  const handleDeleteClick = async () => {
    try {
      await DeleteInventory(item._id);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };
  
  const handleUpdateClick = async () => {
    try {
      await UpdateInventory(item._id, {});
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-2">
      <div className="card w-96 glass shadow-xl flex justify-end mt-5 mb-3">
        <figure><img src={item.images} alt={item.name} /></figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>Stock Available: {item.stock}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-error" onClick={handleDeleteClick}>
              Delete
            </button>
            <button className="btn" onClick={handleUpdateClick}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
