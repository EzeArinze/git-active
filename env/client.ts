import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_GITHUB_INSTALLATION_HREF: z.url().min(1),
  },

  runtimeEnv: {
    NEXT_PUBLIC_GITHUB_INSTALLATION_HREF:
      process.env.NEXT_PUBLIC_GITHUB_INSTALLATION_HREF,
  },
})
