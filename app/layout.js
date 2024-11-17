'use client';

import { SessionProvider } from 'next-auth/react';
import Navigation from "@/componenets/Navigation";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Navigation/>
        <SessionProvider>{children}</SessionProvider>
        </body>
        </html>
    );
}
