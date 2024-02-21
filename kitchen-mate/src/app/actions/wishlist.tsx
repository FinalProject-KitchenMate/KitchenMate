"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addWistlist(reciptId: number) {
  // console.log(reciptId, "<<<<<<<<<<<<<<");
  const res = await fetch("http://localhost:3000/api/wishlists", {
    method: "POST",
    headers: {
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(reciptId),
  });
}

export async function removeWistlist(id: string) {
  const res = await fetch(`http://localhost:3000/api/wishlists/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  revalidatePath("/", "layout");
<<<<<<< HEAD
  redirect("/myrecipes");
=======
  // redirect("/myrecipes")
  if (!res.ok) {
    throw new Error("Failed fetch");
  } 
  return 'success'
>>>>>>> a3431545b28b8351951a45c15d823da5a1f2e9fb
}
