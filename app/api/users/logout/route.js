import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "No active session" }, { status: 401 });
        }

        // Clear session cookies
        const response = NextResponse.json({ message: "Signout successful" });
        response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
        response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });

        return response;
    } catch (error) {
        console.error("Error signing out:", error);
        return NextResponse.json({ error: "Signout failed" }, { status: 500 });
    }
}
