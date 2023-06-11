import { Adapter } from 'next-auth/adapters';
import { prisma } from '../prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie, parseCookies } from 'nookies';

export default function PrismaAdapter(
  req: NextApiRequest,
  res: NextApiResponse
): Adapter {
  return {
    async createUser(user) {
      const { '@callendar:userId': cookiesUserId } = parseCookies({ req });

      if (!cookiesUserId) {
        throw new Error('User id not found in the cookies');
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: cookiesUserId,
        },
        data: {
          name: user.name,
          avatar_url: user.avatar_url,
          email: user.email,
        },
      });

      destroyCookie({ res }, '@callendar:userId', { path: '/' });

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser?.email!,
        avatar_url: prismaUser.avatar_url!,
        emailVerified: null,
      };
    },
    async getUser(id) {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user?.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user?.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_id_provider_account_id: {
            provider_account_id: providerAccountId,
            provider_id: provider,
          },
        },
        include: {
          user: true,
        },
      });

      if (!account) {
        return null;
      }

      const { user } = account;

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user?.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id!,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser?.email!,
        avatar_url: updatedUser.avatar_url!,
        emailVerified: null,
      };
    },
    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          provider_type: account.type,
          provider_id: account.provider,
        },
      });
    },
    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          session_token: sessionToken,
          expires: expires,
          access_token: sessionToken,
        },
      });

      return { sessionToken, userId, expires };
    },
    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      });

      if (!session) {
        return null;
      }

      const { user } = session;

      return {
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.user_id,
        },
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user?.email!,
          avatar_url: user.avatar_url!,
          emailVerified: null,
        },
      };
    },
    async updateSession({ sessionToken, expires, userId }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: { expires, user_id: userId },
      });

      return {
        expires: prismaSession.expires,
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
      };
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({ where: { session_token: sessionToken } });
    },
  };
}
