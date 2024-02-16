import React from "react";
import { InventoryType } from "@/types/type";

interface InventoryCardProps {
  item: InventoryType;
  onDelete: () => void; // Function to delete the card
  onUpdate: () => void; // Function to update the card
}

const InventoryCard: React.FC<InventoryCardProps> = ({ item, onDelete, onUpdate }) => {
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
            <button className="btn btn-error">Delete</button>
            <button className="btn">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;