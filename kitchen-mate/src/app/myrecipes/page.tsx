"use client";
import { useEffect, useState } from "react";
import CardMyRecipe from "@/components/CardMyRecipe";
import axios from "axios";

export default function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      const userId = "";
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists",
        {
          headers: {
            userId: userId,
          },
        }
      );
      console.log(response.data.data, ">>>>>>>>>>>>>>");
      setMyRecipes(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // console.log(myRecipes, ">>>>>>>>>>>>>>");
  return (
    <>
      <h1 className="text-5xl font-medium text-primary mt-11 mb-6 text-center">
        <b>MyRecipes</b>
      </h1>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-4 gap-4 mb-7">
          {myRecipes.map((recipe, index) => (
            <CardMyRecipe key={index} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}
