"use client";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";
// import { api } from "../convex/_generated/api";

export default function Home() {
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    storeUser();
  }, []);
  return (
    <div>
      {/* {tasks?.map(({ _id, text }: any) => <div key={_id}>{text}</div>)} */}
      {/* <SignIn /> */}
      <Button>Click me</Button>
    </div>
  );
}
