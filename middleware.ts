'use server'
import { NextRequest, NextResponse } from 'next/server';
import { isUserLogged } from '@/utils/auth.utils';
import { signOut } from 'next-auth/react';

export default async function middleware(req: NextRequest) {

  const url = req.url;
  const routeList: {url: string, mustBeConnected: boolean}[] = [
    {url: '/register', mustBeConnected: false},
    {url: '/login', mustBeConnected: false},
  ]

    for(const route of routeList) {
        if (url === 'http://' + req.headers.get('host') + route.url || url === 'https://' + req.headers.get('host') + '/' + route.url) {
            console.log(url);
            console.log(routeList);
            console.log(await isUserLogged());
            if (await isUserLogged() === route.mustBeConnected) {
                return NextResponse.next();
            } else {
                return NextResponse.redirect('/login');
            }
        }
    }
    return NextResponse.next();
}