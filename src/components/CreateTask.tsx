import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // Ensure this is imported
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
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Plus } from "lucide-react";
import { Card } from "./ui/card";
import { useRef } from "react"; // Add this import

type FormData = z.infer<typeof taskSchema>;

interface IProps {
  DialogInitiator: React.ReactElement;
}

const CreateTaskDialog = ({ DialogInitiator }: IProps) => {
  const { user } = useUser();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      return;
    }
    try {
      await createTask({
        title: data.title,
        description: data.description,
        classCode: user!.unsafeMetadata!.classroomCode as string,
      });
      reset();
      if (dialogCloseRef.current) {
        dialogCloseRef.current.click();
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="h-full w-full">
      <Dialog>
        <DialogTrigger asChild>{DialogInitiator}</DialogTrigger>
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
                      placeholder="Enter your task title"
                      {...register("title")}
                    />
                    {errors && (
                      <div className="text-xs text-rose-700">
                        {errors.title?.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Type your task details here."
                      {...register("description")}
                    />
                    {errors && (
                      <div className="text-xs text-rose-700">
                        {errors.description?.message}
                      </div>
                    )}
                  </div>
                  <div className="flex w-full justify-center">
                    <div className="flex gap-2">
                      <DialogClose ref={dialogCloseRef} asChild>
                        <Button type="button" variant="outline">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create task"}
                      </Button>
                    </div>
                  </div>
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
