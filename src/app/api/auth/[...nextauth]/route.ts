import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Required for JWT signing
  pages: {
    signIn: "/", // If user needs to sign in, redirect them to home
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/map`; // Automatically redirect all logins to "/map"
    },
  },
});

export { handler as GET, handler as POST };
