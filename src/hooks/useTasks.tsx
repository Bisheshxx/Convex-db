import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../convex/_generated/api";
import { Tasks } from "@/Types";
interface IProps {
  classCode: string;
}
const useTasks = ({ classCode }: IProps) => {
  const tasks = useQuery(api.tasks.getTasksByClassCode, {
    classCode,
  });
  return { tasks };
};

export default useTasks;
