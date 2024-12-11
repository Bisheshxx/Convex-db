import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <div className="h-full w-full flex justify-center aligh-center items-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
