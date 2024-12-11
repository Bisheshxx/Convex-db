"use client";
// import { SignUp } from "@clerk/nextjs";
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
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/Validator";
import { z } from "zod";
import { Controller } from "react-hook-form";

type FormData = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema), // Use Zod resolver for validation
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      type: "",
      classroomCode: "",
    },
  });
  console.log(errors);

  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);
    alert("Sign-up successful!");
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="flex justify-center">Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    placeholder="Enter your Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-700">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    placeholder="Enter your Password"
                    type="password"
                  />
                  {errors.password && (
                    <p className="text-xs text-rose-700">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    {...register("confirmPassword")}
                    placeholder="Confirm your Password"
                    type="password"
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
                    <p className="text-xs text-rose-700">
                      {errors.type.message}
                    </p>
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
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => reset()}>
                Cancel
              </Button>
              <Button type="submit">Sign Up</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;