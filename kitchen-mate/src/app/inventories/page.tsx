"use client";
import React, { useState, useEffect } from "react";
import InventoryCard from "@/components/InventoryCard";
import { InventoryType } from "@/types/type";

interface InventoryPageProps {}

const InventoryPage: React.FC<InventoryPageProps> = () => {
  const [filteredData, setFilteredData] = useState<InventoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/inventories/list?page=${page}`);
      const newData = await response.json();
      setFilteredData((prevData) => [...prevData, ...newData.data]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newData.data.length > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        fetchMoreData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <div className="grid md:grid-cols-4">
      {filteredData.map((item) => (
        <InventoryCard key={item._id.toString()} item={item} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InventoryPage;
