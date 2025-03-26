import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/lib/db';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
            });
          } else {
            await User.findOneAndUpdate(
              { email: user.email },
              { lastLogin: new Date() }
            );
          }
          
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      try {
        await connectDB();
        const user = await User.findOne({ email: session.user?.email });
        if (user) {
          session.user.id = user._id.toString();
          session.user.isPremium = user.isPremium;
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };