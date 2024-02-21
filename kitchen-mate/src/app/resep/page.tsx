"use client";
import CardResep from "@/components/CardResep";
import Link from "next/link";
import { useEffect, useState } from "react";
import ServerProtectedComponent from "@/components/ServerProtectedComponent";
export interface Root {
  results: Result[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface Result {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export default function Resep() {
  const [dataApi, setDataApi] = useState<Root>();
  const [selectedCuisine, setSelectedCuisine] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 16;

  useEffect(() => {
    const fetchdata = async () => {
      let url = `https://api.spoonacular.com/recipes/complexSearch?number=${recipesPerPage}&offset=${
        (currentPage - 1) * recipesPerPage
      }`;
      if (selectedCuisine !== "All") {
        url += `&cuisine=${selectedCuisine}`;
      }
      if (selectedType !== "All") {
        url += `&type=${selectedType}`;
      }
      const res = await fetch(url, {
        headers: {
          "x-api-key": "32ab990db30641cb99a50948f6caecd6",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to Fetch");
      }
      const result = await res.json();
      setDataApi(result);
    };
    fetchdata();
  }, [currentPage, selectedCuisine, selectedType]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCuisine(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };
  console.log(selectedType, ">>>>>>>>>>>>>>");
  return (
    <>
      {/* <ServerProtectedComponent> */}

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full  border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto  dark:bg-gray-800">
          <ul className="space-y-2 font-medium mt-9">
            <li>
              <div>
                <Link
                  href="/generate"
                  className="btn btn-outline btn-primary w-full max-w-xs mb-4"
                >
                  Generate Your Recipe
                </Link>
                <div>
                  <label className="form-control w-full max-w-xs mb-4">
                    <div className="label">
                      <span className="label-text">
                        <b>Filter By Country</b>
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      onChange={handleCuisineChange}
                      value={selectedCuisine}
                    >
                      <option value="All">All</option>
                      <option value="Asian">Asian</option>
                      <option value="American">American</option>
                      <option value="European">European</option>
                      <option value="French">French</option>
                      <option value="Indian">Indian</option>
                      <option value="Korean">Korean</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs mb-4">
                    <div className="label">
                      <span className="label-text">
                        <b>Filter By Type</b>
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      onChange={handleTypeChange}
                      value={selectedType}
                    >
                      <option value="All">All</option>
                      <option value="main course">main course</option>
                      <option value="side dish">side dish</option>
                      <option value="dessert">dessert</option>
                      <option value="appetizer">appetizer</option>
                      <option value="salad">salad</option>
                      <option value="bread">bread</option>
                      <option value="breakfast">breakfast</option>
                      <option value="beverage">beverage</option>
                      <option value="sauce">sauce</option>
                      <option value="marinade">marinade</option>
                      <option value="fingerfood">fingerfood</option>
                      <option value="snack">snack</option>
                      <option value="drink">drink</option>
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
          <b>Rekomendasi Recipe</b>
        </h1>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-4">
          <div className="grid grid-cols-4 gap-4 mb-7">
            {dataApi?.results.map((recipt, i) => {
              return (
                <div key={i}>
                  <CardResep recipt={recipt} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="btn btn-outline btn-primary mr-2"
              >
                Previous
              </button>
            )}
            {dataApi && currentPage * recipesPerPage < dataApi.totalResults && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="btn btn-outline btn-primary"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      {/* </ServerProtectedComponent> */}
    </>
  );
}
