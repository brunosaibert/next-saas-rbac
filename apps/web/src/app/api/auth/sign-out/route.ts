import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()

  cookieStore.delete('token')

  const redirectURL = request.nextUrl.clone()

  redirectURL.pathname = '/auth/sign-in'

  return NextResponse.redirect(redirectURL)
}
