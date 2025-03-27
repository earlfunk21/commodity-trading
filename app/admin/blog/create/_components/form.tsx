"use client";

import { createBlog } from "@/actions/pooling/blog.action";
import { getCommodityList } from "@/actions/pooling/commodity.action";
import { AutoComplete } from "@/components/ui-extension/auto-complete";
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
import { Commodity } from "@/types/pooling.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z.string({ required_error: "Title of the blog is required" }),
  content: z.string(),
  commodityId: z.string({ required_error: "Commodity is required" }),
  show: z.boolean(),
});

export default function BlogCreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      show: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createBlog(values);

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
          name="commodityId"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Commodity</FormLabel>
              <FormControl>
                <AutoComplete
                  name="commodity"
                  value={field.value}
                  onChange={field.onChange}
                  getData={async (searchValue) => {
                    const result = await getCommodityList({
                      search: searchValue,
                    });
                    if (result.error) {
                      toast.error("Something went wrong", {
                        description: result.error,
                      });
                      return [];
                    }
                    return result.data;
                  }}
                  label={(item: Commodity) => item.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                <FormLabel>
                  Show to Public
                </FormLabel>
                <FormDescription>
                  This blog post will be publicly visible if checked or stay private if unchecked
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
                <Input {...field} placeholder="Enter blog title" />
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
            {form.formState.isSubmitting ? "Submitting..." : "Create new Blog"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
