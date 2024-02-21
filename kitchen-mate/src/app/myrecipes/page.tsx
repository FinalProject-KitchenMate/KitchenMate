"use client";
import { useEffect, useState } from "react";
import CardMyRecipe from "@/components/CardMyRecipe";
import axios from "axios";
import ServerProtectedComponent from "@/components/ServerProtectedComponent";
import Loading from "./loading";

export default function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      const userId = "";
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists",
        {
          headers: {
            userId: userId,
          },
        }
      );
      // console.log(response.data.data, ">>>>>>>>>>>>>>");
      setMyRecipes(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };
  // console.log(myRecipes, ">>>>>>>>>>>>>>");
  return (
    <>
      {/* <ServerProtectedComponent> */}
      <h1 className="text-5xl font-medium text-primary mt-11 mb-6 text-center">
        <b>My Recipes</b>
      </h1>
      <div className="flex justify-center items-center mt-12">
        <div className="grid grid-cols-4 gap-4 mb-7">
          {myRecipes.map((recipe, index) => (
            <CardMyRecipe key={index} recipe={recipe} />
          ))}
        </div>
      </div>
      {/* </ServerProtectedComponent> */}
    </>
  );
}
