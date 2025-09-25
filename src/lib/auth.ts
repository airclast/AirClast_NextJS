// lib/auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    role?: string;
  }
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      role?: string;
    };
    accessToken?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { name,email, password } = credentials as { name:string; email: string; password: string };

        try {
          const res = await axios.post(
            `https://sky-guard.vercel.app/api/v1/auth/login`,
            { name,email, password },
            {withCredentials:true}
          );
          const user = res?.data?.data;
          if(!user)return null;
          
          if (user) {
            
            return {
              id: user.user._id,
              name: user.user.name,
              email: user.user.email,
              role: user.user.role,
              accessToken:user.accessToken
            };
          } else {
            
            return null;
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // On initial login, user exists
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: typeof token.id === 'string' ? token.id : String(token.id ?? ''),
        name: token.name!,
        email: token.email!,
        role: typeof token.role === 'string' ? token.role : '',
      };
      session.accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined; // optional
      return session;
    },
    
  },
});
