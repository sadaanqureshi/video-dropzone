import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connecttodb } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authopts: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "example@xyz.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email password")
        }

        try {
          await connecttodb()
          const user = await User.findOne({ email: credentials.email })

          if (!user) {
            throw Error("No user found with this email");
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) {
            throw new Error("Invalid Password")
          }

          return {
            id: user._id.toString(),
            email: user.email
          }
        } catch (error) {
          console.log("ERROR IN AUTH")
          throw error

        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"

  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET
};