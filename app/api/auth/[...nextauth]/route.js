import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma"; // Adjust the import for Prisma
import bcrypt from "bcryptjs";

// Define `authOptions` directly in this file
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                // Authenticate the user using your database
                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user) {
                    throw new Error("Invalid email or password");
                }

                const isValidPassword = await bcrypt.compare(password, user.password);

                if (!isValidPassword) {
                    throw new Error("Invalid email or password");
                }

                // Return user object if valid
                return { id: user.id, email: user.email, name: user.name };
            },
        }),
    ],
    pages: {
        signIn: "/login", // Redirect unauthenticated users to this page
    },
    session: {
        strategy: "jwt", // Use JWT for sessions
    },
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is defined
};

// NextAuth handler
const handler = NextAuth(authOptions);

// Export HTTP methods explicitly
export { handler as GET, handler as POST };
