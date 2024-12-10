"use client";
import { Button } from "@/components/ui/button";
import SignUp from "@/Auth/Signup-page";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignIn } from "@clerk/nextjs";
// import { api } from "../convex/_generated/api";

export default function Home() {
  return (
    <div>
      {/* {tasks?.map(({ _id, text }: any) => <div key={_id}>{text}</div>)} */}
      {/* <SignIn /> */}
      <Button>Click me</Button>
    </div>
  );
}
