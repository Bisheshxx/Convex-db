import { taskSchema } from "@/Validator";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../convex/_generated/api";
import { z } from "zod";
import { Tasks } from "@/Types";
import { Id } from "../../../convex/_generated/dataModel";
import TaskDialog from "../TaskDialog";
type FormData = z.infer<typeof taskSchema>;

interface IProps {
  task: Tasks;
  DialogInitiator: React.ReactElement;
}

const UpdateTask = ({ task, DialogInitiator }: IProps) => {
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
      title: task.title,
      description: task.description,
    },
  });
  const updateTask = useMutation(api.tasks.updateTask);

  const onSubmit = async (data: FormData) => {
    if (!user || !user.unsafeMetadata?.classroomCode) {
      console.error("User or classroom code is missing");
      return;
    }
    try {
      await updateTask({
        title: data.title,
        description: data.description,
        id: task._id as Id<"task">,
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

export default UpdateTask;
