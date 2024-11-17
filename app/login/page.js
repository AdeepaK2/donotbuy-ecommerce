"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(null); // Reset error state

        const result = await signIn("credentials", {
            redirect: true, // Automatically redirect after login
            callbackUrl: "/", // Redirect to homepage after successful login
            email, // Send email from state
            password, // Send password from state
        });

        if (!result.ok) {
            setError(result.error); // Display error if login fails
        }
    };

    return (
        <main>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </main>
    );
}
