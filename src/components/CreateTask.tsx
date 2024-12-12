import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { taskSchema } from "@/Validator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { createTask } from "../../convex/tasks";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Plus } from "lucide-react";
import { Card } from "./ui/card";

type FormData = z.infer<typeof taskSchema>;

const CreateTaskDialog = () => {
  const { user } = useUser();
  //   const { type, classroomCode } = user?.unsafeMetadata;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const createTask = useMutation(api.tasks.createTask);

  const onSubmit = async (data: FormData) => {
    if (!user || !user.unsafeMetadata?.classroomCode) {
      console.error("User or classroom code is missing");
      return; // Or handle the error appropriately
    }
    try {
      const res = await createTask({
        title: data.title,
        description: data.description,
        classCode: user!.unsafeMetadata!.classroomCode as string,
      });
      console.log(res);
    } catch (error) {}
  };

  return (
    <div className="h-full w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Card className="h-full w-full flex justify-center items-center">
            <Plus />
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription asChild>
              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Task Title</Label>
                    <Input
                      id="name"
                      placeholder="Enter your Email"
                      {...register("title")}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Description</Label>
                    <Textarea
                      placeholder="Type your task details here."
                      {...register("description")}
                    />
                  </div>
                  <Button type="submit"> Create task </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;
