import mongoDBClient from "@/lib/mongodb/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {},
  adapter: MongoDBAdapter(mongoDBClient),
});
