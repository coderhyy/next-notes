import NextAuth, { User } from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { addUser, getUser } from "./lib/prisma";

const providers: Provider[] = [
  Credentials({
    name: "密码登录",
    credentials: {
      username: {
        label: "账号",
        type: "text",
        placeholder: "请输入您的账号",
      },
      password: {
        label: "密码",
        type: "password",
        placeholder: "请输入您的密码",
      },
    },
    async authorize(credentials) {
      // 默认情况下不对用户输入进行验证，确保使用 Zod 这样的库进行验证
      let user = null;

      if (
        typeof credentials.username !== "string" ||
        typeof credentials.password !== "string"
      )
        return null;

      // 登陆信息验证
      user = await getUser(credentials.username, credentials.password);

      // 密码错误
      if (user === 1) return null;

      // 用户注册
      if (user === 0) {
        user = await addUser(credentials.username, credentials.password);
      }

      if (!user) {
        throw new Error("User was not found and could not be created.");
      }

      return user as User;
    },
  }),
  GitHub,
];

export const providerMap = providers.map((provider: Provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers,
  pages: {
    // signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/note/edit")) return !!auth;
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && account.type === "credentials" && user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      if (baseUrl.indexOf(":3000") > -1) return url;
      return baseUrl;
    },
  },
});
