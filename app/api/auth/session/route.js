import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(
            JSON.stringify({ error: "Not authenticated" }),
            { status: 401 }
        );
    }

    return new Response(
        JSON.stringify({ user: session.user }),
        { status: 200 }
    );
}
