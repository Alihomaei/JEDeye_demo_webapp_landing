import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const users = [
  {
    id: 'founder-1',
    name: 'Ali Tavakkoli, MD',
    image: '/images/team/AT.jpg',
  },
  {
    id: 'founder-2',
    name: 'Farhad R. Nezami, PhD',
    image: '/images/team/FRN.webp',
  },
  {
    id: 'founder-3',
    name: 'Ali Homaei, MD, MBA',
    image: '/images/team/AH.jpg',
  },
];

const SHARED_PASSWORD = 'JEDeye@2025!';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        userId: {},
        password: {},
      },
      authorize(credentials) {
        const { userId, password } = credentials as {
          userId: string;
          password: string;
        };

        if (password !== SHARED_PASSWORD) return null;

        const user = users.find((u) => u.id === userId);
        if (!user) return null;

        return { id: user.id, name: user.name, image: user.image };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isOnLogin = nextUrl.pathname === '/login';

      if (isOnLogin) {
        if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
        return true;
      }

      return isLoggedIn;
    },
  },
});
