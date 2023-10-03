import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from 'next-auth';

interface AuthUser extends User {
  email: string,
  firstName: string,
  lastName: string,
  token: string
}

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
        const user: AuthUser = await response.json();
        if (user) {
          console.log('-----------------------------------------------------');
          console.log({user});
          console.log('-----------------------------------------------------');
          return user
        } else {
          console.log('nooooooooooooooooooooooooooooooo');
          return null
        }
      },
    })
  ],
  // callbacks: {
  //   async session(session, user) {
  //     // Add custom data to the session.user object
  //     session.user = { ...session.user }
  //     return session
  //   },
  // },
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60,
  },
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
