"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import Navigation from "@/components/NavigationBar";
interface IProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProviderProps) => {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const convex = new ConvexReactClient(convexUrl!);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <>loading</>;
  return (
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      <AuthLoading>Loading...</AuthLoading>
      <Authenticated>
        <Navigation />
        {children}
      </Authenticated>
      <Unauthenticated>{children}</Unauthenticated>
    </ConvexProviderWithClerk>
    // </ClerkProvider>
  );
};

export default Providers;
