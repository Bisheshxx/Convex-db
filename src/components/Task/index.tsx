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
import { Pen } from "lucide-react";
import UpdateTask from "../updateTask";

interface IProps {
  task: Tasks;
}

const Task = ({ task }: IProps) => {
  return (
    <Card key={task._id} className="relative">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center gap-4 ">
            <span>{task.title}</span>
            <div className="cursor-pointer hover:bg-gray-300 p-1 rounded-md">
              <UpdateTask task={task} DialogInitiator={<Pen size={16} />} />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-10">{task.description}</CardContent>
      <CardFooter className="text-sm absolute bottom-0 left-0 w-full p-0 px-6 py-2">
        {convertDate(task._creationTime)}
      </CardFooter>
    </Card>
  );
};

export default Task;
