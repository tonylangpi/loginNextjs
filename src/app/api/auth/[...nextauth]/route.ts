import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { conectividad } from "@/libs/mongodb";
import User from "@/Models/user";
import bcyrpt from "bcryptjs";

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Username",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password", placeholder: "****" },
      },
      async authorize(credentials, req) {
        await conectividad();
        const userFound = await User.findOne({ email: credentials?.email }).select("+passwordHash");
        
        console.log(userFound); 
        if (!userFound) throw new Error("credenciales invalidas");
        const passMatch = await bcyrpt.compare(
          credentials!.password,
          userFound.passwordHash
        );
        if (!passMatch) throw new Error("credenciales invalidas");

        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  pages:{
     signIn: '/login'
  }
});

export { handler as GET, handler as POST };
