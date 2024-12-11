"use client";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailverificationSchema } from "@/Validator";
import { z } from "zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof emailverificationSchema>;

const Verification = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(emailverificationSchema), // Use Zod resolver for validation
    defaultValues: {
      code: "",
    },
  });

  const onPressVerify = async (data: FormData) => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
      if (completeSignUp.status !== "complete") {
      }
    } catch (error) {
      throw new Error(String(error));
    }
  };
  if (!isLoaded) {
    return null;
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onPressVerify)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex justify-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Code</Label>
                <Input placeholder="Enter your Code" {...register("code")} />
                {errors.code && (
                  <p className="text-xs text-rose-700">{errors.code.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => reset()}>
              Cancel
            </Button>
            <Button type="submit">Verify</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Verification;
