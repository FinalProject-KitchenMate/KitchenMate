import React, { useState, useEffect } from "react";
import InventoryCard from "@/components/InventoryCard";
import { InventoryType } from "@/types/type";
import { cookies } from "next/headers";


interface InventoryPageProps {}
async function getInventories() {
  const auth_inventory_token = cookies().get("Authorization")?.value.split(" ")[1];
  console.log(auth_inventory_token, 'ini auth token');
  const response = await fetch(
    "http://localhost:3000/api/inventories/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      cache: "no-store",
    }
  )
  return response.json()
}
const InventoryPage = async () => {
  const inventories = await getInventories();
  console.log(inventories, 'ini inventories')
  return (
    <div className="grid md:grid-cols-4">
      {inventories.data.map((item: InventoryType) => (
        <InventoryCard key={item._id.toString()} item={item} />
      ))}
    </div>
  );
};


export default InventoryPage;


