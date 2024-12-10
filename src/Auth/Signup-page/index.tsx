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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex justify-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input id="name" placeholder="Enter your Email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your Password"
                  type="password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Confirm Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your Password"
                  type="password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Role:</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Teacher</SelectItem>
                    <SelectItem value="sveltekit">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Sign Up</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
