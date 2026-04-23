import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
  const { path, secret, type } = await req.json()

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 })
  }

  revalidatePath(path, type)

  return NextResponse.json({ ok: true }, { status: 200 })
}
