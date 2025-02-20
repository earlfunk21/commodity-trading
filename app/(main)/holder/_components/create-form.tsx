"use client";

import { createHolder } from "@/actions/pulling/holder.action";
import { PasswordInput } from "@/components/ui-extension/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  user: userSchema,
});

export default function HolderCreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      user: {
        username: "",
        email: "",
        password: "",
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createHolder(values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Successfully added");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ex. John" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ex. Ramsy" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ex. Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user.username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">Username</FormLabel>
              <FormControl>
                <div className="relative flex items-center rounded-md border border-zinc-800 focus-within:ring-1 focus-within:ring-orange-500 pl-2 bg-zinc-900/50">
                  <UserIcon className="h-5 w-5 text-orange-500" />
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    className="border-0 focus-visible:ring-0 shadow-none bg-transparent text-zinc-100"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative flex items-center rounded-md border border-zinc-800 focus-within:ring-1 focus-within:ring-orange-500 pl-2 bg-zinc-900/50">
                  <MailIcon className="h-5 w-5 text-orange-500" />
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="border-0 focus-visible:ring-0 shadow-none bg-transparent text-zinc-100"
                    type="email"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full">
          {form.formState.isSubmitting ? "Submitting..." : "Create new Holder"}
        </Button>
      </form>
    </Form>
  );
}
