'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogout = () => {
    cookies().delete("Authorization");
    redirect("/login");
};
