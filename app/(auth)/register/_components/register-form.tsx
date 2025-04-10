"use client";
import { registerHolder } from "@/actions/core/auth.action";
import { validateEmail, validateUsername } from "@/actions/core/user.action";
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
import { MailIcon, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const formSchema = z.object({
  referror: z.string().optional(),
  username: z
    .string()
    .min(6, { message: "Username must atleast 6 characters!" })
    .refine(
      async (username) => {
        const { data: isValidUsername } = await validateUsername(username);

        return !isValidUsername;
      },
      { message: "Username already exists!" }
    ),
  password: z.string().min(1, {
    message: "Password must required!",
  }),
  firstName: z.string().min(1, { message: "First name must required!" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name must required!" }),
  email: z
    .string()
    .email({ message: "Email is not valid!" })
    .refine(
      async (email) => {
        const { data: isValidEmail } = await validateEmail(email);

        return !isValidEmail;
      },
      { message: "Email already exists!" }
    ),
});

export type FormSchema = z.infer<typeof formSchema>;

type Props = {
  referror?: string;
};

export default function RegisterForm({ referror }: Props) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referror,
      username: "",
      password: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    const { error } = await registerHolder(values);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(
      "Successfully registered!. Please contact the admin to activate your account.",
      {
        duration: 1000 * 30,
      }
    );
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
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
                    onBlur={async () => {
                      await form.trigger("email");
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">Username</FormLabel>
              <FormControl>
                <div className="relative flex items-center rounded-md border border-zinc-800 focus-within:ring-1 focus-within:ring-orange-500 pl-2 bg-zinc-900/50">
                  <User className="h-5 w-5 text-orange-500" />
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    className="border-0 focus-visible:ring-0 shadow-none bg-transparent text-zinc-100"
                    onBlur={async () => {
                      await form.trigger("username");
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">Password</FormLabel>
              <FormControl>
                <PasswordInput
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  className="bg-zinc-900/50 border-zinc-800 text-zinc-100"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

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

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition-opacity text-white font-medium py-2 h-11">
          {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
