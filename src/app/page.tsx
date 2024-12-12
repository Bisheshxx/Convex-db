"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import CreateTaskDialog from "@/components/CreateTask";
import { Tasks } from "@/Types";
import { Card } from "@/components/ui/card";
import Task from "@/components/Task";
import { Plus } from "lucide-react";
// import { api } from "../convex/_generated/api";

export default function Home() {
  const storeUser = useMutation(api.users.store);
  const { user } = useUser();
  const tasks = useQuery(api.tasks.getTasksByClassCode, {
    classCode: (user && (user.unsafeMetadata.classroomCode as string)) || "",
  });
  console.log(tasks);
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
      <div className="">
        <div>Task</div>
        <div className="grid grid-cols-4 gap-4">
          {tasks?.map((task: Tasks) => <Task task={task} />)}
          {user?.unsafeMetadata?.type === "teacher" && <CreateTaskDialog />}
        </div>
      </div>
      <div>{/* <Button>Create task</Button> */}</div>
    </div>
  );
}
