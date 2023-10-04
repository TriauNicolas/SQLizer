"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

type NextAuthsessionProviderProps = {
  children: React.ReactNode;
};
function NextAuthSessionProvider({ children }: NextAuthsessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthSessionProvider;