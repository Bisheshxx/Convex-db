import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // Ensure this is imported
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { Ref } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { taskSchema } from "@/Validator";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type FormData = z.infer<typeof taskSchema>;

interface IProps {
  DialogInitiator: React.ReactElement;
  register: UseFormRegister<FormData>;
  handleSubmit: (
    onValid: (data: FormData) => void,
    onInvalid?: (errors: FieldErrors<FormData>) => void
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<FormData>;
  isSubmitting: boolean;
  onSubmit: (data: FormData) => void; // Assuming onSubmit takes FormData as an argument
  dialogCloseRef: Ref<HTMLButtonElement>;
}

const TaskDialog = ({
  DialogInitiator,
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  dialogCloseRef,
}: IProps) => {
  return (
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
  );
};

export default TaskDialog;
