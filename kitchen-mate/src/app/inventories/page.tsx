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

const InventoryPage =  async () => {
  const inventories = await getInventories();
  console.log(inventories, 'ini inventories');
  // const [filteredData, setFilteredData] = useState<InventoryType[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);
  
  // const fetchMoreData = async () => {
  //   setLoading(true);
  //   try {
  //     const auth_inventory_token = cookies()
  //     .get("Authorization")
  //     ?.value.split(" ")[1];
  //     console.log(auth_inventory_token);
  //     const response = await fetch(`http://localhost:3000/api/inventories/list`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Cookie: `Authorization=${auth_inventory_token}`,
  //       },
  //       cache: "no-store",
  //     })
      
      
  //     const newData = await response.json();
  //     // Check if newData.data is an array before proceeding
  //     if (Array.isArray(newData.data)) {
  //       setFilteredData((prevData) => [...prevData, ...newData.data]);
  //       setHasMore(newData.data.length > 0);
  //     } else {
  //       console.error('newData.data is not an array:', newData.data);
  //       // Optionally set hasMore to false here if an error means no more data can be loaded
  //       // setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop ===
  //       document.documentElement.offsetHeight
  //     ) {
  //       fetchMoreData();
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [hasMore]);

  // useEffect(() => {
  //   fetchMoreData();
  // }, []);

  return (
    <div className="grid md:grid-cols-4">
      {/* {filteredData.map((item) => (
        <InventoryCard key={item._id.toString()} item={item} />
      ))}
      {loading && <p>Loading...</p>} */}
    </div>
  );
};

export default InventoryPage;


