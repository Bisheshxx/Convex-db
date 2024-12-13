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
import Spinner from "@/components/Spinner";
interface IProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProviderProps) => {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const convex = new ConvexReactClient(convexUrl!);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  return (
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      <AuthLoading>
        <div className="h-full w-full flex justify-center items-center">
          <Spinner height="50" width="50" />
        </div>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>{children}</Unauthenticated>
    </ConvexProviderWithClerk>
    // </ClerkProvider>
  );
};

export default Providers;
