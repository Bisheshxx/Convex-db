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
import { Button } from "@/components/ui/button";
import { FieldErrors } from "react-hook-form";
import { signinSchema } from "@/Validator";
import { z } from "zod";
import Link from "next/link";
type FormData = z.infer<typeof signinSchema>;

interface SignInComponentProps {
  register: Function;
  handleSubmit: (
    onValid: (data: FormData) => void,
    onInvalid?: (errors: FieldErrors<FormData>) => void
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<FormData>;
  isSubmitting: boolean;
  onSubmit: (data: FormData) => void; // Assuming onSubmit takes FormData as an argument
  ClerkError: string;
}
const SignInComponent = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  ClerkError,
}: SignInComponentProps) => {
  return (
    <form
      className="h-screen w-screen flex justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="w-[350px] h-[400px]">
        <CardHeader>
          <CardTitle className="flex justify-center">SignIn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                id="identifier"
                placeholder="Enter your Email"
                {...register("identifier")}
              />
              {errors && (
                <div className="text-xs text-rose-700">
                  {errors.identifier?.message}
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input
                id="password"
                placeholder="Enter your Password"
                type="password"
                {...register("password")}
              />
              {errors && (
                <div className="text-xs text-rose-700">
                  {errors.password?.message}
                </div>
              )}
              {ClerkError && (
                <div className="text-xs text-rose-700">{ClerkError}</div>
              )}
            </div>
          </div>
          <Link href={"/sign-up"}>Don't Have an account?</Link>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>{isSubmitting ? "Loading..." : "Sign In"}</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignInComponent;
