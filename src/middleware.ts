import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId, redirectToSignIn } = await auth();
  console.log(userId, isPublicRoute(request));

  // if (!isPublicRoute(request)) {
  //   await auth.protect();
  // }
  if (!userId && !isPublicRoute(request)) {
    // Add custom logic to run before redirecting
    await auth.protect();
    // return redirectToSignIn();
  }
  if (userId && isPublicRoute(request)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
