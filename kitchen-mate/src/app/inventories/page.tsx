import React, { useState, useEffect } from "react";
import InventoryCard from "@/components/InventoryCard";
import { InventoryType } from "@/types/type";
import { cookies } from "next/headers";
import Link from "next/link";

interface InventoryPageProps {}

export async function getInventories() {
  const auth_inventory_token = cookies().get("Authorization")?.value.split(" ")[1];
  console.log(auth_inventory_token, "ini auth token");
  
  const response = await fetch("http://localhost:3000/api/inventories/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    cache: "no-store",
  });
  return response.json();
}

const InventoryPage: React.FC<InventoryPageProps> = async () => {
  const inventories = await getInventories();
  return (
    <>
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium mt-9">
            <li>
              <div>
                <Link href="/add-inventory" className="btn btn-outline btn-primary w-full max-w-xs mb-4">
                  Add Your Inventory
                </Link>
                <div>
                  <label className="form-control w-full max-w-xs mb-4">
                    <div className="label">
                      <span className="label-tex text-white">
                        <b>Filter By Your Inventory</b>
                      </span>
                    </div>
                    <select className="select select-bordered">
                      <option>All</option>
                      <option>Daging</option>
                      <option>Sayur</option>
                      <option>Buah</option>
                      <option>Drinks</option>
                      <option>Frozen Food</option>
                    </select>
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <h1 className="text-xl text-center">
          <b>Your Inventory</b>
        </h1>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-4">
          <div className="grid md:grid-cols-4 gap-12 mt-4 mb-4 ">
            {inventories.data.map((item: InventoryType) => (
              <InventoryCard key={item._id.toString()} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
