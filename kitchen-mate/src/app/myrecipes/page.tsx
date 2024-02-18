"use client";
import CardMyRecipe from "@/components/CardMyRecipe";

export default function MyRecipes() {
    return (
        <>
            <h1 className="text-5xl font-medium text-primary mt-11 mb-6 text-center"><b>MyRecipes</b></h1>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-4 gap-4 mb-7">
                    <CardMyRecipe />
                    <CardMyRecipe />
                    <CardMyRecipe />
                    <CardMyRecipe />
                    <CardMyRecipe />
                    <CardMyRecipe />
                    <CardMyRecipe />
                    <CardMyRecipe />
                </div>
            </div>
        </>
    );
};