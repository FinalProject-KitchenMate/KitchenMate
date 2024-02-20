"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function AddInventory(data: any) {
  const res = await fetch("http://localhost:3000/api/inventories", {
    method: "POST",
    headers: {
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(data),
  });
}

export async function DeleteInventory(_id: string) {
  const res = await fetch(`http://localhost:3000/api/inventories/delete/${_id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  revalidatePath("/", "layout");
}

export async function UpdateInventory(id: string, data: any) {
  const res = await fetch(`http://localhost:3000/api/inventories/update/${id}`, {
    method: "PUT",
    headers: {
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(data),
  });
}