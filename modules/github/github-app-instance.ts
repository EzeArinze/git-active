import { env } from "@/env/server"
import { App } from "octokit"

export const githubApp = new App({
  appId: env.GITHUB_APP_ID!,
  privateKey: env.GITHUB_APP_PRIVATE_KEY,
  webhooks: {
    secret: env.GITHUB_APP_WEBHOOK_SECRET,
  },
})
