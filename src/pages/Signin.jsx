import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import logo from "../assets/logo.jpg";

const Signin = () => {
  return (
    <div className=" w-full h-full">
      <div className=" h-[10%] flex justify-between items-center px-10">
      <span className="text-2xl font-bold flex items-center justify-center gap-2">
          <img src={logo} alt="logo" className="w-[40px] rounded full" />
         <span > Meta<span className="text-blue-600">Drive</span></span>
        </span>
        <Link
          to="/signin"
          className="flex items-center justify-center transition ease-in h-10 rounded-md px-8 bg-background border border-input text-white-foreground shadow hover:bg-white hover:text-black"
        >
          Sign Up
        </Link>
      </div>
      <Card className="mx-auto max-w-sm mt-[10rem]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-start">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="* * * * * * * * * *"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
