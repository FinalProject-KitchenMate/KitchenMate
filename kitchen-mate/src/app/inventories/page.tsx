import InventoryCard from '@/components/InventoryCard';
import { InventoryType } from '@/types/type';
import React from 'react';

interface InventoryPageProps {
  // Mungkin Anda ingin menambahkan properti lain yang diperlukan untuk halaman inventory di sini
}

const InventoryPage: React.FC<InventoryPageProps> = () => {
  
  const inventoryData: InventoryType[] = [
    {
      _id: '123',
      name: 'name 1',
      stock: '10',
      images: 'url1',
      category: 'Category A',
      tags: ['Tag1', 'Tag2'],
      expired: '2024-12-31',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
    },
    // Tambahkan data lain sesuai kebutuhan
  ];

  return (
    <div className="inventory-page">
      {inventoryData.slice(0, 10).map((item, index) => (
        <InventoryCard key={index} item={item} />
      ))}
    </div>
  );
};

export default InventoryPage;
