"use server";
import { cookies } from "next/headers";

export async function AddInventory(data: any) {
  const res = await fetch("http://localhost:3000/api/inventory", {
    method: "POST",
    headers: {
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(data),
  });
}
