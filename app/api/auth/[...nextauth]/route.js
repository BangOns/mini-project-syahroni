import { login } from "@/app/libs/firebase/services";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        name: {
          label: "nama",
          type: "text",
          placeholder: "Masukkan nama anda",
        },
        password: { label: "password", type: "password", placeholder: "****" },
      },
      async authorize(credentials) {
        const { name, password } = credentials;
        let username = {
          name,
          password,
        };
        const response = await login(username, (values) => {
          return values;
        });
        if (response.status) {
          return response;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.name = user.data.name;
        token.id = user.data.id;
        token.role = user.data.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
    async signIn({ user, account, credentials }) {
      return credentials;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
  },
  // pages: {
  //   signIn: "/",
  // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
