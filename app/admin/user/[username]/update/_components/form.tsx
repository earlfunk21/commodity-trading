"use client";

import { updateUser } from "@/actions/core/user.action";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, UserStatus } from "@/types/core.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().optional(),
  status: z.nativeEnum(UserStatus),
});

type Props = {
  user: User;
};

export default function UserUpdateForm({ user }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      password: "",
      status: user.status,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password === "") {
      values.password = undefined;
    }

    const result = await updateUser(user.id, values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Successfully updated");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
                  <MailIcon className="h-5 w-5 text-muted-foreground text-orange-500" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="border-0 focus-visible:ring-0 shadow-none"
                    {...field}
                  />
                </div>
              </FormControl>
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
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select User Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={UserStatus.Active}>Active</SelectItem>
                  <SelectItem value={UserStatus.Inactive}>Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full">
          {form.formState.isSubmitting ? "Submitting..." : "Update User"}
        </Button>
      </form>
    </Form>
  );
}
