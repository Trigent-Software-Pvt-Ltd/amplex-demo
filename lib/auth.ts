import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Amplex Portal",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (email === "walmart@amplex.com" && password === "demo123") {
          return {
            id: "1",
            name: "Walmart Stores Inc.",
            email: "walmart@amplex.com",
            image: null,
          };
        }

        if (email === "mikaj@amplex.com" && password === "Trigent@2026") {
          return {
            id: "2",
            name: "Mika Jaaskelainen",
            email: "mikaj@amplex.com",
            image: null,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
