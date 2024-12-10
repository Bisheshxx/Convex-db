"use client";
// import { Button } from "@/components/ui/button";
import SignUp from "@/Auth/Signup-page";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
// import { api } from "../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api?.task?.get);
  return (
    <div>
      {tasks?.map(({ _id, text }: any) => <div key={_id}>{text}</div>)}
      {/* <SignUp /> */}
      {/* <Button>Click me</Button> */}
    </div>
  );
}
