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
import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/configs/store";
import { registerUser, clearError } from "@/configs/store/slices/authSlice";

const formSchema = z.object({
  name: z.string().min(1).min(1).max(50),
  email: z.string(),
  password: z.string().min(6),
});

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { status, user, error } = useSelector((state: RootState) => state.auth);

  function onSubmit(formData: z.infer<typeof formSchema>) {
    try {
      dispatch(registerUser(formData));
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  useEffect(() => {
    if (status === "succeeded" && user) {
      navigate("/");
    }
  }, [status, user, navigate]);

  // error hiding after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearError());
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, dispatch]);

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register your account</CardTitle>
        <CardDescription>
          Enter your details below to register your account
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Enter your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="email" {...field} />
                  </FormControl>
                  <FormDescription>Enter your email</FormDescription>
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
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be at least 6 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full cursor-pointer" type="submit">
              Register
            </Button>
          </form>
          {error && (
            <div className="flex h-10 items-center justify-center rounded-md border border-red-500 bg-red-50">
              <span className="text-sm font-medium text-red-500">{error}</span>
            </div>
          )}
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link to="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
