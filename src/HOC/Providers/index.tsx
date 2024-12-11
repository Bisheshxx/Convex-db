"use client";
import React, { useEffect, useState } from "react";
import {
  ClerkProvider,
  SignIn,
  SignUp,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import Navigation from "@/components/NavigationBar";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

interface IProviderProps {
  children: React.ReactNode;
}
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = new ConvexReactClient(convexUrl!);
const Providers = ({ children }: IProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const { isSignedIn, sessionId, userId } = useAuth();
  useEffect(() => setIsMounted(true));
  useEffect(() => {
    if (!isSignedIn) {
      //   redirect("/sign-in");
      console.log(isSignedIn);
    }
  }, [isSignedIn]);
  if (!isMounted) return null;
  return (
    // <ClerkProvider
    // //   publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    // >
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
