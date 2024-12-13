"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import CreateTaskDialog from "@/components/CreateTask";
import { Tasks } from "@/Types";
import Task from "@/components/Task";
import { CircleSlash } from "lucide-react";
import useUserData from "@/hooks/useUserData";
import useTasks from "@/hooks/useTasks";
import Spinner from "@/components/Spinner";
import Navigation from "@/components/NavigationBar";

export default function Home() {
  const { user } = useUser();
  const { tasks, isLoading } = useTasks({
    classCode: (user && (user.unsafeMetadata.classroomCode as string)) || "",
  });
  const { storeUser } = useUserData();
  useEffect(() => {
    if (user && user.unsafeMetadata.type && user.unsafeMetadata.classroomCode) {
      storeUser({
        userType: user.unsafeMetadata.type as string,
        classCode: user.unsafeMetadata.classroomCode as string,
      });
    }
  }, [user]);
  return (
    <>
      <Navigation />
      <div className="h-full w-full container mx-auto">
        <div>
          <div className="text-xl font-bold w-full flex justify-center p-6">
            {" "}
            Tasks for Class number:{" "}
            {user?.unsafeMetadata.classroomCode as string}
          </div>
        </div>
        {!isLoading ? (
          <div className="">
            <div className="grid grid-cols-4 gap-4">
              {tasks && tasks?.length > 0 ? (
                tasks?.map((task: Tasks) => <Task key={task._id} task={task} />)
              ) : (
                <div className="col-span-4 h-96 flex justify-center items-center">
                  <div className="flex gap-4 text-[64px] justify-center items-center">
                    <CircleSlash size={64} /> No Tasks
                  </div>
                </div>
              )}
              {user?.unsafeMetadata?.type === "teacher" && <CreateTaskDialog />}
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
