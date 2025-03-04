"use client";

import { updateComplan } from "@/actions/complan-system/complan.action";
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
import { Textarea } from "@/components/ui/textarea";
import { Complan } from "@/types/complan-system.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string({ required_error: "Name of the complan is required" }),
  description: z.string().min(1, "Description of the complan is required"),
});

type Props = {
  complan: Complan;
};

export default function ComplanUpdateForm({ complan }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: complan.name,
      description: complan.description,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await updateComplan(complan.id, values);

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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ex. Precious Metals" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="ex. Gold, Silver, Platinum, etc."
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
          {form.formState.isSubmitting
            ? "Submitting..."
            : "Submit New Complan"}
        </Button>
      </form>
    </Form>
  );
}
