import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import { createUserBalance } from "../../actions/userActions";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
        name: { label: "Name", type: "text", required: true },
        email: { label: "Email", type: "email", required: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { phone, password } = credentials;

        const existingUser = await db.user.findFirst({
          where: { number: phone },
        });

        if (existingUser) {
          const isValid = await bcrypt.compare(password, existingUser.password);
          if (!isValid) return null;

          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.number,
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        try {
          const newUser = await db.user.create({
            data: {
              number: phone,
              password: hashedPassword,
              name: credentials.name,
              email: credentials.email,
            },
          });

          await createUserBalance(newUser.id);

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.number,
          };
        } catch (e) {
          console.error("User creation failed:", e);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
};
