import React from "react";
import { InventoryType } from "@/types/type";

interface InventoryCardProps {
  item: InventoryType;
  onDelete: () => void; // Fungsi untuk menghapus kartu
  onUpdate: () => void; // Fungsi untuk memperbarui kartu
}

const InventoryCard: React.FC<InventoryCardProps> = ({ item, onDelete, onUpdate }) => {
  const handleDelete = () => {
    // Panggil onDelete saat tombol hapus diklik
    onDelete();
  };

  const handleUpdate = () => {
    // Panggil onUpdate saat tombol perbarui diklik
    onUpdate();
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-2">
      <div className="card w-96 bg-base-100 shadow-xl flex justify-end mt-5 mb-3">
        <div className="card-body">
          <figure>
            <img src={item.images} alt={item.name} />
          </figure>
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>Stock Available: {item.stock}</p>
          <div className="card-actions">
            <div className="badge badge-outline">{item.category}</div>
            <div className="badge badge-outline">{item.tags.join(", ")}</div>
            <button className="btn btn-error" onClick={handleDelete}>Delete</button>
            <button className="btn" onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
