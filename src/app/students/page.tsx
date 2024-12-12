"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../convex/_generated/api";

const Students = () => {
  const { user } = useUser();
  const students = useQuery(api.users.getStudents, {
    classCode: user?.unsafeMetadata.classroomCode as string,
  });
  return (
    <div>
      {students && students.map((student: any) => <>{student.email}</>)}
    </div>
  );
};

export default Students;
