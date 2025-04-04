"use client";

import { updateNewsEvent } from "@/actions/pooling/news-event.action";
import { TextEditor } from "@/components/ui-extension/text-editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { NewsEvent } from "@/types/pooling.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z.string({ required_error: "Title of the news event is required" }),
  content: z.string(),
  show: z.boolean(),
});

type Props = {
  newsEvent: NewsEvent;
};

export default function NewsEventUpdateForm({ newsEvent }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: newsEvent.title,
      content: newsEvent.content,
      show: newsEvent.show,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await updateNewsEvent(newsEvent.id, values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Successfully updated");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="show"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Show to Public</FormLabel>
                <FormDescription>
                  This newsEvent post will be publicly visible if checked or stay
                  private if unchecked
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter newsEvent title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TextEditor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Update NewsEvent"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
