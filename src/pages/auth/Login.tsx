"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/configs/store";
import { clearError, loginUser } from "@/configs/store/slices/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { error, status, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function onSubmit(credentials: z.infer<typeof formSchema>) {
    try {
      console.log(credentials);
      dispatch(loginUser(credentials));
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/");
    }
  }, [status, user, navigate]);

  // toast message handling
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearError());
    }, 3000);

    return () => clearInterval(timer);
  }, [dispatch, error]);

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-6 py-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="email" {...field} />
                  </FormControl>
                  <FormDescription>Enter you email </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full cursor-pointer" type="submit">
              Submit
            </Button>
            {error && (
              <div className="flex h-10 items-center justify-center rounded-md border border-red-500 bg-red-50">
                <span className="text-sm font-medium text-red-500">
                  {error}
                </span>
              </div>
            )}
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <Link to="/auth/register" className="underline">
              Register
            </Link>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
