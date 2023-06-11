import { Adapter } from 'next-auth/adapters';
import { prisma } from '../prisma';

export default function PrismaAdapter(): Adapter {
  return {
    async getUser(id) {
      const user = await prisma.user.findUniqueOrThrow({ where: { id } });

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
      const user = await prisma.user.findUniqueOrThrow({ where: { email } });

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
      const { user } = await prisma.account.findUniqueOrThrow({
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

      return user;
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
      const { user, ...session } = await prisma.session.findUniqueOrThrow({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      });

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
  };
}
