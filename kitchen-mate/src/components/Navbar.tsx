'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    let savedTheme: string | null = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    let initialTheme: string = savedTheme || 'lemonade'
    let [theme, setTheme] = useState(initialTheme)

    let toggleTheme = () => {
        let newTheme: string = theme === 'forest' ? 'lemonade' : 'forest'
        setTheme(newTheme)
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme)
        }
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <>
            <div className="navbar bg-base-100 border-b shadow-xl mb-5 sticky top-0 z-50">
                <div className="navbar-start">
                    <Link href="/" className="hover:text-primary font-bold focus:outline-none focus:shadow-outline transition duration-300 text-2xl ml-4"><b className="text-primary">Kitchen</b><b className="text-accent">Mate</b></Link>
                </div>
                <div className="navbar-center gap-7">
                    <Link href="/inventories" className="hover:text-primary font-bold focus:outline-none focus:shadow-outline transition duration-300">Inventories</Link>
                    <Link href="/recipes" className="hover:text-primary font-bold focus:outline-none focus:shadow-outline transition duration-300">Recipe Generator</Link>
                    <Link href="/myrecipes" className="hover:text-primary font-bold focus:outline-none focus:shadow-outline transition duration-300">My Recipe</Link>
                    <Link href="/about" className="hover:text-primary font-bold focus:outline-none focus:shadow-outline transition duration-300">About Us</Link>
                </div>
                <div className="navbar-end">

                    <label className="swap swap-rotate mx-4 btn btn-ghost btn-circle">
                        <input
                            type="checkbox"
                            className="theme-controller"
                            value={theme}
                            onChange={toggleTheme}
                            checked={theme === 'forest'}
                        />
                        <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                        <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                    </label>

                    <button className="btn btn-ghost btn-circle mr-5">
                    <svg className="w-8 h-8 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                    </svg>
                </button>

                </div>
            </div>
        </>
    );
}
