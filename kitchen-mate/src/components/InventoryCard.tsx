import React from 'react';
import Link from 'next/link';
import { InventoryType } from '@/types/type';

interface InventoryCardProps {
  item: InventoryType;
}

const InventoryCard: React.FC<InventoryCardProps> = ({ item }) => {
  const itemId = item && item._id ? item._id : '';

  return (
    <Link href={`/inventory/${itemId}`} className="bg-white p-6 text-center hover:opacity-75 block rounded-md">
        <img
          src={item.images[0]}
          alt={item.name}
          className="mb-4 w-full h-1/2 object-cover rounded-md"
        />
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600">{item.category}</p>
        <p className="text-gray-600">{item.stock}</p>
    </Link>
  );
};

export default InventoryCard;
