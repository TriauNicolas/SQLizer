import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const data: {email: string, password: string, csrfToken?: string} = JSON.parse(JSON.stringify(credentials));
        delete data?.csrfToken
        const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const user = await response.json();
        if (user) {
          return user
        } else {
          return null
        }
      },
    })
  ],
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
      }
      return token;
    },
    // @ts-ignore
    session: async ({ session, token }) => {
      session.user.email = token.email
      session.user.token = token.token;
      session.user.firstName = token.firstName
      session.user.lastName = token.lastName
      return session;
    },
  },
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.SECRET
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
