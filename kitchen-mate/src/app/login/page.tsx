import Link from "next/link";
import { redirect } from "next/navigation";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import { cookies } from "next/headers";
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'KitchenMate - Login',
    description: 'KitchenMate Login',
}

type MyResponse = {
    message: string;
    accessToken?: string;
}

export default function Login() {
    const handleLogin = async (FormData: FormData) => {
        'use server';
        const email = FormData.get("email");
        const password = FormData.get("password");

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users/login", {
            method: "POST",
            cache: "no-store",
            body: JSON.stringify({ email, password }),
        })

        const result: MyResponse = await response.json();

        if (!response.ok) {
            return redirect("/login?error=" + result.message);
        }

        cookies().set('Authorization', `Bearer ${result.accessToken}`)

        return redirect("/resep");

    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <form action={handleLogin}>
                    <div className="relative flex flex-col m-6 space-y-8 bg-base-200 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                        <div className="flex flex-col justify-center p-8 md:p-14">
                            <span className="mb-3 text-4xl font-bold">Login</span>
                            <span className="font-light text-bg-body-secondary">
                                Welcome to <b>UpWare</b>
                            </span>
                            <ClientFlashComponent />
                            <div className="py-4">
                                <span className="mb-2 text-md">Email</span>
                                <input
                                    type="text"
                                    className="w-full p-2 rounded-md border"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="py-4">
                                <span className="mb-2 text-md">Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full p-2 rounded-md border"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-4 bg-primary p-2 rounded-lg mb-6 hover:bg-secondary"
                            >
                                <b>Login</b>
                            </button>

                            <div className="text-center text-bg-body-secondary ">
                                Don't have an account?
                                <Link href='/register' className="font-bold mx-2 text-bg-primary hover:text-secondary">Register</Link>
                            </div>
                        </div>

                        <div className="relative bg-base-300 rounded-md">
                            <img
                                src="https://awsimages.detik.net.id/community/media/visual/2023/04/12/tupperware.jpeg?w=600&q=90"
                                alt="img"
                                className="w-[420px] h-full hidden rounded-r-2xl md:block object-cover"
                            />

                        </div>

                    </div>
                </form>
            </div>
        </>
    );
}