"use client";
import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/Validator";
import { z } from "zod";
import { Controller } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import Verification from "@/components/Authentication/Verification";
import { ClerkError } from "@/Types";

type FormData = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [clerkError, setClerkError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      type: "",
      classroomCode: "",
    },
  });
  const { isLoaded, signUp } = useSignUp();
  const onSubmit = async (data: FormData) => {
    if (!isLoaded) {
      return;
    }
    const { confirmPassword, ...formData } = data;
    try {
      await signUp?.create({
        emailAddress: formData.email,
        password: formData.password,
        unsafeMetadata: {
          type: formData.type,
          classroomCode: formData.classroomCode,
        },
      });
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (error: unknown) {
      // Type assertion to ClerkError
      const clerkError = error as ClerkError;

      if (clerkError.clerkError) {
        setClerkError(clerkError.errors[0].message);
      } else {
        setClerkError("An unexpected error occurred. Please try again.");
      }
      console.log(JSON.stringify(error));
    }
  };
  if (!isLoaded) {
    return null;
  }
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div id="clerk-captcha" />
      {!pendingVerification ? (
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
                    reset();
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
        </div>
      ) : (
        <Verification setPendingVerification={setPendingVerification} />
      )}
    </div>
  );
};

export default SignUpPage;
