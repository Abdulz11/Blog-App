import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { User } from "../db/models";
import connectToDb from "../db/utils";

const authOptions: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        await connectToDb();
        let loggedInUser = await User.find({ email: user.email });
        console.log(loggedInUser);
        if (loggedInUser) {
          return true;
        } else {
          await User.create({
            username: user.name,
            email: user.email,
            img: user?.image,
          });
          return true;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
