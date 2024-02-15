"use client";
import Card from "@/components/Card";
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
      {dataApi?.results.map((recipt, i) => {
        return (
          <div key={i}>
            <Card recipt={recipt} />;
          </div>
        );
      })}
    </>
  );
}
