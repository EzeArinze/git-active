import { betterAuth } from "better-auth/minimal"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { db } from "./server/db"
import { env } from "@/env/server"

export const auth = betterAuth({
  baseURL: env.ORIGIN,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: "pg" }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      scope: ["repo", "read:user", "user:email"],
    },
  },
  rateLimit: {
    enabled: true,
    window: 10 * 60,
    max: 10,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60,
    },
  },
  trustedOrigins: [env.ORIGIN || "http://localhost:3000"],
  plugins: [nextCookies()],
})
