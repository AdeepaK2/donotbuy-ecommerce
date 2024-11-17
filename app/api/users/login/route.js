import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user in the database
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Return user info (you might want to create a session instead)
        return NextResponse.json({
            message: "Login successful",
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
