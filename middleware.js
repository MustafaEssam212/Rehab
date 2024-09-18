import { NextResponse } from 'next/server';

const RATE_LIMIT = 70; // Max requests per time window
const TIME_WINDOW = 60 * 1000; // Time window in milliseconds (1 minute)
const REQUESTS_MAP = new Map(); // In-memory store for request counts and timestamps

export function middleware(req) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'localhost';


  const now = Date.now();
  const userData = REQUESTS_MAP.get(ip) || { count: 0, firstRequestTime: now };

  // Clean up old requests
  if (now - userData.firstRequestTime > TIME_WINDOW) {
    userData.count = 0;
    userData.firstRequestTime = now;
  }

  userData.count += 1;


  if (userData.count > RATE_LIMIT) {
    const url = new URL('/too-many-requests', req.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  REQUESTS_MAP.set(ip, userData);
  return NextResponse.next();
}


export const config = {
    matcher: ['/api/:path*'],
  };