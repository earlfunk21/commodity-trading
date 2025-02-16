"use client";
import { authenticate } from "@/actions/core/auth.action";
import { MotionDiv } from "@/components/ui-extension/motion-div";
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
import { DEFAULT_REDIRECT } from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(1, { message: "Username must required!" }),
  password: z.string().min(1, {
    message: "Password must required!",
  }),
});

export type FormSchema = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    const result = await authenticate(values);

    if (result) {
      toast.error(result.error, { description: result.message });
      return;
    }

    router.push(DEFAULT_REDIRECT);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
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
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}>
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
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition-opacity text-white font-medium py-2 h-11">
            {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </MotionDiv>
      </form>
    </Form>
  );
}
