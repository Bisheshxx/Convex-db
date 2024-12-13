"use client";
import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import useUserData from "@/hooks/useUserData";

const Navigation = () => {
  const {} = useUserData();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          {/* <MountainIcon className="h-6 w-6" /> */}
          <h1>Logo</h1>
        </Link>

        <div className="flex items-center gap-4">
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Navigation;
