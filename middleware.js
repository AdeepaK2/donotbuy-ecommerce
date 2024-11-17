import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login", // Redirect unauthenticated users to this page
    },
});

export const config = {
    matcher: ["/", "/protected/:path*"], // Protect homepage and other routes
};
