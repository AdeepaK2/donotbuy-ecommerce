"use client";

import { useEffect, useState } from "react";

export default function Page() {
    const [user, setUser] = useState(null); // To track logged-in user
    const [loading, setLoading] = useState(true); // To track loading state
    const [error, setError] = useState(null); // To track errors

    // Fetch the user session or authentication status
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch("/api/auth/session");
                if (!res.ok) {
                    throw new Error("Failed to fetch session");
                }
                const session = await res.json();
                setUser(session?.user || null); // Update user state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Stop loading after fetch
            }
        };

        fetchSession();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user ? (
                <div>
                    <h1>Welcome, {user.name}!</h1>
                    <p>Your email: {user.email}</p>
                </div>
            ) : (
                <div>
                    <h1>You are not logged in</h1>
                    <a href="/login">Go to Login</a>
                </div>
            )}
        </main>
    );
}
