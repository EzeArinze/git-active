// import { githubApp } from "@/modules/github/github-app-instance"
// import { handleGitHubEvent } from "@/modules/github/webhook-actions/webhook-handler"
// import { headers } from "next/headers"
// import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   const payload = await req.text()

//   const headersList = await headers()

//   const signature = headersList.get("x-hub-signature-256") || ""
//   const event = headersList.get("x-github-event") || ""

//   try {
//     await githubApp.webhooks.verify(payload, signature)

//     const data = JSON.parse(payload)

//     await handleGitHubEvent(event, data)

//     return NextResponse.json({ ok: true })
//   } catch (error) {
//     console.error("Webhook error:", error)
//     return new NextResponse("Invalid signature", { status: 401 })
//   }
// }

// app/api/github/webhooks/route.ts

import "@/modules/github/webhook-actions/webhook-handler"

import { githubApp } from "@/modules/github/github-app-instance"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const payload = await req.text()

  const headersList = await headers()

  try {
    await githubApp.webhooks.verifyAndReceive({
      id: headersList.get("x-github-delivery")!,
      name: headersList.get("x-github-event")!,
      signature: headersList.get("x-hub-signature-256")!,
      payload,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return new NextResponse("Webhook error", { status: 500 })
  }
}
