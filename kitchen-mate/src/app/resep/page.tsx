"use client";
import ChatResep from "@/components/CardResep";
import { useEffect, useState } from "react";
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
    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetch(
                "https://api.spoonacular.com/recipes/complexSearch?cuisine=german&number=10",
                {
                    headers: {
                        "x-api-key": "32ab990db30641cb99a50948f6caecd6",
                    },
                }
            );
            if (!res.ok) {
                throw new Error("Failed to Fetch");
            }
            const result = await res.json();

            setDataApi(result);
        };
        fetchdata();
    }, []);
    console.log(dataApi?.results);

    return (
        <>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium mt-9">
                        <li>
                            <div>
                                <button className="btn btn-outline btn-primary w-full max-w-xs mb-4">Generate Your Recipe</button>
                                <div>
                                    <label className="form-control w-full max-w-xs mb-4">
                                        <div className="label">
                                            <span className="label-text"><b>Filter By Country</b></span>
                                        </div>
                                        <select className="select select-bordered" >
                                            <option>All</option>
                                            <option>Asian</option>
                                            <option>American</option>
                                            <option>European</option>
                                            <option>French</option>
                                            <option>Indian</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                {/* <h1 className='text-xl '>Rekomendasi Recipe</h1> */}
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-4">
                    <div className="grid grid-cols-4 gap-4 mb-7">
                        {dataApi?.results.map((recipt, i) => {
                            return (
                                <div key={i}>
                                    <ChatResep recipt={recipt} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};