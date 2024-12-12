import { Tasks } from "@/Types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { convertDate } from "@/utils/date-time";

interface IProps {
  task: Tasks;
}

const Task = ({ task }: IProps) => {
  return (
    <Card key={task._id} className="relative">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-10">{task.description}</CardContent>
      <CardFooter className="text-sm absolute bottom-0 left-0 w-full p-0 px-6 py-2">
        {convertDate(task._creationTime)}
      </CardFooter>
    </Card>
  );
};

export default Task;
