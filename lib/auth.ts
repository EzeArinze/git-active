import { betterAuth } from "better-auth/minimal"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { db } from "./server/db"

export const auth = betterAuth({
  baseURL: process.env.ORIGIN,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: "pg" }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: ["repo", "read:user", "user:email"],
    },
  },
  rateLimit: {
    enabled: true,
    window: 10 * 60,
    max: 10,
    // storage:"database",
    // modelName:"rateLimit"
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60,
    },
  },
  plugins: [nextCookies()],
})
