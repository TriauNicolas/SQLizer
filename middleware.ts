import { NextRequest, NextResponse } from 'next/server';
import { isUserLogged } from '@/utils/auth.utils';
import { getToken } from 'next-auth/jwt';
import { signOut } from 'next-auth/react';

export default async function middleware(req: NextRequest) {

  const url = req.url;
  const routeList: { url: string, mustBeConnected: boolean }[] = [
    {url: '/register', mustBeConnected: false},
    {url: '/login', mustBeConnected: false},
  ]

  const protocol = req.headers.get('referer')?.split('://')[0] ? req.headers.get('referer')?.split('://')[0] + '://' : 'http://';
  for(const route of routeList) {
      if (url === protocol + req.headers.get('host') + route.url) {
          const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
          if (!token?.token && !route.mustBeConnected) {
            return NextResponse.next();
          }
          if (typeof token?.token === 'string' && await isUserLogged(token?.token) === route.mustBeConnected) {
              return NextResponse.next();
          } else {
              const redirectUrl = protocol + req.headers.get('host') + (route.mustBeConnected ? '/login' : '/');
              return NextResponse.redirect(redirectUrl);
          }
      }
  }
  return NextResponse.next();
}