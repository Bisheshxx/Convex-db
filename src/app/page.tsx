"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import CreateTaskDialog from "@/components/CreateTask";
import { Tasks } from "@/Types";
import Task from "@/components/Task";
import { CircleSlash, Plus } from "lucide-react";
import useUserData from "@/hooks/useUserData";
import useTasks from "@/hooks/useTasks";
import Spinner from "@/components/Spinner";
import Navigation from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
      <div className="h-fit w-full container mx-auto">
        <div>
          <div className="text-xl font-bold w-full flex justify-center p-6">
            {" "}
            Tasks for Class number:{" "}
            {user?.unsafeMetadata.classroomCode as string}
          </div>
        </div>
        {!isLoading ? (
          <div className="">
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
              {tasks && tasks?.length > 0 ? (
                tasks?.map((task: Tasks) => <Task key={task._id} task={task} />)
              ) : (
                <div className="col-span-4  flex justify-center items-center">
                  <div className="flex flex-col gap-4 ">
                    <div className="flex justify-center items-center text-[64px]">
                      <CircleSlash size={64} /> No Tasks
                    </div>
                    <div>
                      <CreateTaskDialog
                        DialogInitiator={
                          <div className="flex justify-center">
                            <Button>Create a New Task</Button>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
              {user?.unsafeMetadata?.type === "teacher" &&
                tasks &&
                tasks?.length > 0 && (
                  <div className="mb-4">
                    <CreateTaskDialog
                      DialogInitiator={
                        <Card className="h-full w-full flex justify-center items-center min-h-48">
                          <Plus />
                        </Card>
                      }
                    />
                  </div>
                )}
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
