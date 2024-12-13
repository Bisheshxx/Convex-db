import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { signUpSchema } from "@/Validator";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/passwordinput";

type FormData = z.infer<typeof signUpSchema>;

interface SignUpComponentProps {
  register: UseFormRegister<FormData>;
  handleSubmit: (
    onValid: (data: FormData) => void,
    onInvalid?: (errors: FieldErrors<FormData>) => void
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<FormData>;
  isSubmitting: boolean;
  onSubmit: (data: FormData) => void; // Assuming onSubmit takes FormData as an argument
  clerkError: string;
  control: Control<FormData>;
}

const SignUpComponent = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  clerkError,
  control,
}: SignUpComponentProps) => {
  const router = useRouter();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex justify-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input placeholder="Enter your Email" {...register("email")} />
              {errors.email && (
                <p className="text-xs text-rose-700">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                {...register("password")}
                placeholder="Enter your Password"
              />
              {errors.password && (
                <p className="text-xs text-rose-700">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                {...register("confirmPassword")}
                placeholder="Confirm your Password"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-rose-700">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Role:</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <p className="text-xs text-rose-700">{errors.type.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="classroomCode">Classroom Code</Label>
              <Input
                {...register("classroomCode")}
                placeholder="Enter your Class code"
                className="uppercase"
                onChange={e => {
                  e.target.value = e.target.value.toUpperCase();
                }}
              />
              {errors.classroomCode && (
                <p className="text-xs text-rose-700">
                  {errors.classroomCode.message}
                </p>
              )}
              {!!clerkError && (
                <p className="text-xs text-rose-700">{clerkError}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignUpComponent;
