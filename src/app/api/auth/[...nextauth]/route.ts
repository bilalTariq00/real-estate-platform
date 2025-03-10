import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

// ✅ Define authentication options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Redirect to home if user is not logged in
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return `${baseUrl}/map`; // ✅ Always redirect to "/map" after sign-in
    },
  },
};

// ✅ Create NextAuth handler
const handler = NextAuth(authOptions);

// ✅ Correct API route export
export { handler as GET, handler as POST };
