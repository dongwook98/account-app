import { User } from '@/models/user'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        // 인증 성공시 실행
        console.log('session', session)
        console.log('token', token)
        ;(session.user as User).id = token.sub as string
      }

      return session
    },
  },
}
export default NextAuth(authOptions)
