import ClientFlashComponent from "@/components/ClientFlashComponent";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
 
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'KitchenMate - Register',
  description: 'KitchenMate Register',
}

export type MyResponse<T = {}> = {
    message: string
    error: string
    data?: T
};

export default function Register() {
    const handleRegister = async (formData: FormData) => {
        'use server';
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users/register", {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        })

        const result: MyResponse = await response.json() as MyResponse;
        

        if (!response.ok) {
            return redirect("/register?error=" + result.error);
        }

        return redirect("/login");
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <form action={handleRegister}>
                    <div className="relative flex flex-col m-6 space-y-8 bg-base-200 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                        <div className="flex flex-col justify-center p-8 md:p-14">
                            <span className="mb-3 text-4xl font-bold">Register</span>
                            <span className="font-light text-bg-body-secondary mb-5">
                                Welcome to <b>UpWare</b>
                            </span>
                            <ClientFlashComponent />
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0 w-full">
                                    <span className="mb-2 text-md">Username</span>
                                    <input
                                        className="w-full p-2 rounded-md border"
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <span className="mb-2 text-md">Email</span>
                                    <input
                                        className="w-full p-2 rounded-md border"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        required

                                    />
                                </div>
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <span className="mb-2 text-md">Password</span>
                                    <input
                                        className="w-full p-2 rounded-md border"
                                        type="text"
                                        id="password"
                                        name="password"
                                        placeholder="password"
                                        required

                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-4 bg-primary p-2 rounded-lg mb-6 hover:bg-secondary"
                            >
                                Register
                            </button>

                            <div className="text-center text-bg-body-secondary ">
                                Have account?
                                <Link href="/login" className="font-bold mx-2 text-bg-primary hover:text-secondary">Login</Link>
                            </div>
                        </div>

                        <div className="relative bg-base-300 rounded-md">
                            <img
                                src="https://shop.tupperware.co.id/media/catalog/product/cache/d659501601eaa628c35b4c5676282018/3/a/3a98b3cf5ccc2b7576309243d7634c67647de5046a37ebb5c7bee9863d0d109d.jpeg"
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