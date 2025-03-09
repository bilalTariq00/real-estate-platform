import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";

// Define authentication options
const authOptions: NextAuthOptions = {
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
      return `${baseUrl}/map`; // Automatically redirect after login
    },
  },
};

// Create the NextAuth handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // Correct API route export
export { authOptions }; // Export for use in getServerSession()
