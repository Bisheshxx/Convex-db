import { useMutation, useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Tasks } from "@/Types";
interface IProps {
  classCode: string;
}
const useTasks = ({ classCode }: IProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const tasks = useQuery(api.tasks.getTasksByClassCode, {
    classCode,
  });
  const updatetask = useMutation(api.tasks.updateTask);
  useEffect(() => {
    if (tasks !== undefined) {
      setIsLoading(false);
    }
  }, [tasks]);

  return { tasks, isLoading, updatetask };
};

export default useTasks;
