"use client";

import { createCommodityType } from "@/actions/pooling/commodity-type.action";
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
import { Commodity } from "@/types/pooling.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Commodity Type Name is required"),
  description: z.string().min(1, "Description is required"),
  commodityId: z.string({ required_error: "Commodity is required" }),
});

type Props = {
  commodity: Commodity;
};

export default function CommodityTypeCreateForm({ commodity }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      commodityId: commodity.id,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createCommodityType(values);

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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ex. Precious Metal" />
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
                  placeholder="ex. Track real-time metal commodity prices and market changes"
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
            : "Create new Commodity Type"}
        </Button>
      </form>
    </Form>
  );
}
