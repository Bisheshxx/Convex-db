"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/Validator";
import { z } from "zod";
import { useSignUp } from "@clerk/nextjs";
import Verification from "@/components/Authentication/Verification";
import { ClerkError } from "@/Types";
import SignUpComponent from "@/Auth/Signup-page";

type FormData = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [clerkError, setClerkError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
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
        <SignUpComponent
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          clerkError={clerkError}
          control={control}
        />
      ) : (
        <Verification setPendingVerification={setPendingVerification} />
      )}
    </div>
  );
};

export default SignUpPage;
