import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Redirect users to home if not logged in
  },
  callbacks: {
    async redirect({ url }) {
      return url.includes("/map") ? url : "/map"; // ✅ Ensure redirection to "/map"
    },
  },
};

// ✅ Only export the NextAuth handler (Fixes TypeScript error)
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
