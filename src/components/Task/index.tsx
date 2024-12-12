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
const covertDate = (timestampMs: any) => {
  let date = new Date(timestampMs);
  return date.toISOString();
};
interface IProps {
  task: Tasks;
}

const Task = ({ task }: IProps) => {
  return (
    <Card key={task._id}>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>{task.description}</CardContent>
      <CardFooter>{covertDate(task._creationTime)}</CardFooter>
    </Card>
  );
};

export default Task;
