import NextAuth from "next-auth";
import { authopts } from "@/lib/nextauthentication";

const handler = NextAuth(authopts)

export {handler as GET, handler as POST}