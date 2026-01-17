import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma/prisma-client';
import { authConfig } from './auth.config';

interface Credentials {
  email: string;
  password: string;
}

function getCredentialsTypeGuard(
  credentials: unknown,
): credentials is Credentials {
  return (
    typeof credentials === 'object' &&
    credentials !== null &&
    'email' in credentials &&
    'password' in credentials &&
    typeof credentials.email === 'string' &&
    typeof credentials.password === 'string'
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (!getCredentialsTypeGuard(credentials)) {
          return null;
        }

        const email = credentials.email;
        const password = credentials.password;

        const user = await prisma.users.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: (user as { name?: string | null }).name ?? null,
        };
      },
    }),
  ],
});
