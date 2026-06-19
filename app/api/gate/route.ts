import { NextResponse } from "next/server"

const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30

export async function POST(request: Request) {
  let password: unknown

  try {
    const body = await request.json()
    password = body?.password
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const expectedPassword = process.env.SITE_PASSWORD
  const accessToken = process.env.SITE_ACCESS_TOKEN

  if (!expectedPassword || !accessToken || password !== expectedPassword) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set("eradna_access", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: THIRTY_DAYS_IN_SECONDS,
  })

  return response
}
