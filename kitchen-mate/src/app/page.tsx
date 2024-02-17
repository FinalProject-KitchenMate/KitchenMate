"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CardResep from "@/components/CardResep";

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

export default function Home() {
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
            <div className="flex items-center">
                <section className="bg-cover bg-center py-32 w-full shadow-md" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}>
                    <div className="container mx-auto text-left text-white" style={{ marginTop: "-4rem" }}>
                        <div className="flex items-center">
                            <div className="w-1/2 ml-4">
                                <h1 className="text-5xl font-medium mb-6 text-primary"><b>KitchenMate</b></h1>
                                <p className="text-xl mb-12 text-black"><b> "Kitchen Mate" describes an application as a buddy that assists in managing and cooking in the kitchen. Make life easier with #kitchenMate!</b></p>
                                <Link href="#">
                                    <button className="bg-primary py-4 px-12 rounded-full hover:bg-secondary">Login</button>
                                </Link>
                            </div>
                            <div className="w-1/2 pl-16">
                                <img src="https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="h-64 w-full object-cover rounded-xl" alt="Layout Image" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <h1 className="text-5xl font-medium text-primary mt-11 mb-6 text-center"><b>Recipe</b></h1>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-4 gap-4 mb-7">
                    {dataApi?.results.slice(0, 4).map((recipt, i) => {
                        return (
                            <div key={i}>
                                <CardResep recipt={recipt} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}
