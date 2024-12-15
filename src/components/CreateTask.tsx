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
import { useRef } from "react"; // Add this import
import TaskDialog from "./TaskDialog";
import { Card } from "./ui/card";
import { Plus } from "lucide-react";

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
      <TaskDialog
        DialogInitiator={DialogInitiator}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        dialogCloseRef={dialogCloseRef}
      />
    </div>
  );
};

export default CreateTaskDialog;
