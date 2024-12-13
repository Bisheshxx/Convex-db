"use client";
import SignInComponent from "@/Auth/signin-page";
import { ClerkError } from "@/Types";
import { signinSchema } from "@/Validator";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof signinSchema>;

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [clerkError, setClerkError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!isLoaded) {
      return;
    }
    try {
      const signInAttempt = await signIn.create({ ...data });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      }
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
  return (
    <div className="h-full w-full flex justify-center aligh-center items-center">
      <SignInComponent
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        ClerkError={clerkError}
      />
    </div>
  );
};

export default SignInPage;
