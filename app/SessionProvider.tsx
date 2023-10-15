"use client";

import React, { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";

type NextAuthsessionProviderProps = {
  children: React.ReactNode;
};

export let session: {}

const NextAuthSessionProvider = ({ children }: NextAuthsessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthSessionProvider;