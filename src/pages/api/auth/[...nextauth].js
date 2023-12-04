import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text", placeholder: "John Smith" }
      },
      async authorize(credentials) {
        const user = {
          id: 1,
          name: "Rita Book",
          email: "ritabook90@gmail.com"
        };
        return user;
      }
    })
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt"
  },
  debug: process.env.NODE_ENV === "development"
};

export default NextAuth(authOptions);
