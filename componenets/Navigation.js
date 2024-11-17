"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {signOut} from "next-auth/react";

export default function Navigation() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Fetch session/user data
    useEffect(() => {
        const fetchSession = async () => {
            const res = await fetch("/api/auth/session");
            const session = await res.json();
            setUser(session?.user || null);
        };
        fetchSession();
    }, []);

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
            {/* Logo */}
            <div className="text-2xl font-bold">
                <Link href="/">
                    MyApp
                </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 mx-6">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Categories Dropdown */}
            <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
            >
                <button className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
                    Categories
                </button>
                {dropdownOpen && (
                    <ul className="absolute left-0 mt-2 bg-gray-700 rounded-md shadow-lg">
                        <li className="px-4 py-2 hover:bg-gray-600">
                            <Link href="/category/tech">
                                Tech
                            </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-600">
                            <Link href="/category/lifestyle">
                                Lifestyle
                            </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-600">
                            <Link href="/category/fashion">
                                Fashion
                            </Link>
                        </li>
                    </ul>
                )}
            </div>

            {/* Authentication Links or User Greeting */}
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <span>Hi, {user.name}</span>
                        <button
                            onClick={() => signOut({callbackUrl: "/login"})}
                            className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-500"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            Login
                        </Link>
                        <Link href="/signup">
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
