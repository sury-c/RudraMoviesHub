
import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { makeSession, cookieName } from '@/lib/auth';

export const runtime = 'nodejs';

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);

  return x.length === y.length && timingSafeEqual(x, y);
}

export async function POST(request: Request) {
  try {
    const usernameExpected = process.env.ADMIN_USERNAME;
    const passwordExpected = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.SESSION_SECRET;

    if (!usernameExpected || !passwordExpected || !sessionSecret) {
      return NextResponse.json(
        { error: 'Admin login is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const username =
      typeof body.username === 'string' ? body.username : '';
    const password =
      typeof body.password === 'string' ? body.password : '';

    if (
      !safeEqual(username, usernameExpected) ||
      !safeEqual(password, passwordExpected)
    ) {
      return NextResponse.json(
        { error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set(cookieName, makeSession(username), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 }
    );
  }
}
