import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

// ✅ Define authentication options (DO NOT EXPORT THIS FROM THE ROUTE FILE)
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
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/map`; // Redirect only after login
    },
  },
};

// ✅ Create NextAuth handler
const handler = NextAuth(authOptions);

// ✅ Correct API route export
export { handler as GET, handler as POST };
