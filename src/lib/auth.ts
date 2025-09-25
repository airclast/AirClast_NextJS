// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import axios from "axios";
// import type { NextAuthOptions } from "next-auth";

// declare module "next-auth" {
//   interface User {
//     accessToken?: string;
//     role?: string;
//     emailVerified?: Date | null;
//   }
//   interface Session {
//     user: {
//       id?: string;
//       name?: string;
//       email?: string;
//       role?: string;
//       emailVerified?: Date | null;
//     };
//     accessToken?: string;
//   }
//   interface JWT {
//     id?: string;
//     name?: string;
//     email?: string;
//     role?: string;
//     accessToken?: string;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "you@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { name, email, password } = credentials as { name: string; email: string; password: string };

//         try {
//           const res = await axios.post(
//             `https://sky-guard.vercel.app/api/v1/auth/login`,
//             { name, email, password },
//             { withCredentials: true }
//           );
//           const user = res?.data?.data;
//           if (!user) return null;

//           return {
//             id: user.user._id,
//             name: user.user.name,
//             email: user.user.email,
//             role: user.user.role,
//             accessToken: user.accessToken,
//           };
//         } catch (error) {
//           console.error("Error during authorization:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.role = user.role;
//         token.accessToken = user.accessToken;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         id: typeof token.id === "string" ? token.id : String(token.id ?? ""),
//         name: token.name!,
//         email: token.email!,
// <<<<<<< HEAD
//         role: typeof token.role === 'string' ? token.role : '',
// =======
//         role: typeof token.role === "string" ? token.role : "",
//         emailVerified: null,
// >>>>>>> 8b93e1db2ae891a025e9cf4321554365d8ae8517
//       };
//       session.accessToken = typeof token.accessToken === "string" ? token.accessToken : undefined;
//       return session;
//     },
//   },
// };

// export const handler = NextAuth(authOptions);

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    role?: string;
    emailVerified?: Date | null;
  }
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      role?: string;
      emailVerified?: Date | null;
    };
    accessToken?: string;
  }
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { name, email, password } = credentials as {
          name: string;
          email: string;
          password: string;
        };

        try {
          const res = await axios.post(
            `https://sky-guard.vercel.app/api/v1/auth/login`,
            { name, email, password },
            { withCredentials: true }
          );
          const user = res?.data?.data;
          if (!user) return null;

          return {
            id: user.user._id,
            name: user.user.name,
            email: user.user.email,
            role: user.user.role,
            accessToken: user.accessToken,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
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
        id: typeof token.id === "string" ? token.id : String(token.id ?? ""),
        name: token.name!,
        email: token.email!,
        role: typeof token.role === "string" ? token.role : "",
        emailVerified: null, 
      };
      session.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

