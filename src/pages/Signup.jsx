import { Button } from "../components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";
import google from "../assets/google.png";
import logo from "../assets/logo.jpg";
import { login, signup } from "../firebase";
import { useState } from "react";

const Signup = () => {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (e) => {
    e.preventDefault();

    if (signState === "Sign In") {
      await login( email, password);
    } 
    else {
      await signup(name, email, password);
    }
  };

  return (
    <div className="w-full h-full py-3">
      {signState === "Sign Up" ? (
        <>
          <div className="w-full h-full">
            <div className="h-[10%] flex justify-between items-center px-10">
              <span className="text-2xl font-bold flex items-center justify-center gap-2">
                <img src={logo} alt="logo" className="w-[40px] rounded full" />
                <span>Meta
                  <span className="text-blue-600">Drive</span>
                </span>
              </span>
              <Button onClick={() => {setSignState("Sign In")}} className="flex items-center justify-center transition ease-in h-10 rounded-md px-8 bg-background border border-input text-white-foreground shadow hover:bg-white hover:text-black">
                Sign In
              </Button>
            </div>
            <Card className="mx-auto max-w-sm mt-[10rem]">
              <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name" className="text-start">Name</Label>
                    <Input id="first-name" placeholder="Max" required value={name} onChange={(e)=>{setName(e.target.value)}}/>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-start">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-start">Password</Label>
                    <Input id="password" type="password" placeholder="* * * * * * * * * *" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                  </div>

                  <Button type="submit" className="w-full" onClick={user_auth}>{signState}</Button>

                  <Button variant="outline" className="w-full flex gap-2">
                    <img src={google} className="w-[17px]" alt="google" />
                    <span>Sign up with Google</span>
                  </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                  Already have an account?
                  <span className="underline" onClick={()=>{setSignState("Sign In")}}>
                    Sign in
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <>
          <div className=" w-full h-full">
            <div className=" h-[10%] flex justify-between items-center px-10">
              <span className="text-2xl font-bold flex items-center justify-center gap-2">
                <img src={logo} alt="logo" className="w-[40px] rounded full" />
                <span>
                  Meta<span className="text-blue-600">Drive</span>
                </span>
              </span>
              <Button
               onClick={() => {
                setSignState("Sign Up");
              }}
        
                className="flex items-center justify-center transition ease-in h-10 rounded-md px-8 bg-background border border-input text-white-foreground shadow hover:bg-white hover:text-black"
              >
                Sign Up
              </Button>
            </div>
            <Card className="mx-auto max-w-sm mt-[10rem]">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-start">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
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
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <Button type="submit" className="w-full" onClick={user_auth}>
                    {signState}
                  </Button>
                  <Button variant="outline" className="w-full flex gap-2">
                    <img src={google} className="w-[17px]" alt="google" />
                    <span>Continue with Google</span>
                  </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <span
                    className="underline"
                    onClick={() => {
                      setSignState("Sign Up");
                    }}
                  >
                    Sign up
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Signup