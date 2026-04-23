import { env } from "@/env/server"
import { task, logger } from "@trigger.dev/sdk"

const NEXTJS_URL = process.env.NEXTJS_APP_URL || "http://localhost:3000"
const SECRET = env.REVALIDATION_SECRET!

export const revalidatePathTask = task({
  id: "revalidate-path",
  run: async (payload: { path: string; type: string }) => {
    const res = await fetch(`${NEXTJS_URL}/api/revalidate/path`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: payload.path,
        secret: SECRET,
        type: payload.type,
      }),
    })

    if (!res.ok) {
      logger.error("Failed to revalidate path", {
        status: res.status,
      })
      return { success: false }
    }

    return { success: true }
  },
})
