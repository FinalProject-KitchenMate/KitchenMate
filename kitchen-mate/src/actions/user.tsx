"use server";
import { redirect } from "next/navigation";

export async function handleRegister(formData: FormData) {
  const userInput = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  };
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users/register", {
    method: "POST",
    body: JSON.stringify(userInput),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Registration Failed, Please try again.");
  }
  redirect("/login");
}
