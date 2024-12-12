"use client";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import CreateTaskDialog from "@/components/CreateTask";
// import { api } from "../convex/_generated/api";

export default function Home() {
  const storeUser = useMutation(api.users.store);
  const { user } = useUser();

  useEffect(() => {
    if (user && user.unsafeMetadata.type && user.unsafeMetadata.classroomCode) {
      storeUser({
        userType: user.unsafeMetadata.type as string,
        classCode: user.unsafeMetadata.classroomCode as string,
      });
    }
  }, [user]);
  return (
    <div className="h-full w-full">
      <div>
        <div className="">
          {" "}
          Class number: {user?.unsafeMetadata.classroomCode as string}
        </div>
      </div>
      <div className="">Tasks</div>
      <div>
        {/* <Button>Create task</Button> */}
        <CreateTaskDialog />
      </div>
    </div>
  );
}
