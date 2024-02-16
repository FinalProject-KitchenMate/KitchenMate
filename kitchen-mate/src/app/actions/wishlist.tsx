"use server";

import { cookies } from "next/headers";

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
