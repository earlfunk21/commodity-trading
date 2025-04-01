"use client";

import { createTrade } from "@/actions/pooling/trade.action";
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
import { formatNumber } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  mainTokenId: z.string({ required_error: "Main Token is required" }),
  capital: z
    .string()
    .transform((value) => value.replace(/,/g, ""))
    .transform((value) => (value === "" ? "" : Number(value))),
  soldAmount: z
    .string()
    .transform((value) => value.replace(/,/g, ""))
    .transform((value) => (value === "" ? "" : Number(value))),
  quantity: z
    .string()
    .transform((value) => value.replace(/,/g, ""))
    .transform((value) => (value === "" ? "" : Number(value))),
});

type Props = {
  mainTokenId: string;
};

export default function TradeCreateForm({ mainTokenId }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainTokenId,
      capital: "",
      soldAmount: "",
      quantity: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createTrade(values);

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
          name="capital"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>Capital</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={formatNumber(field.value)}
                  placeholder="Enter capital"
                  type="text"
                  pattern="^[0-9,]*\.?[0-9]*$"
                  onChange={(e) => field.onChange(formatNumber(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="soldAmount"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>Sold amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={formatNumber(field.value)}
                  placeholder="Enter sold amount"
                  type="text"
                  pattern="^[0-9,]*\.?[0-9]*$"
                  onChange={(e) => field.onChange(formatNumber(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={formatNumber(field.value)}
                  placeholder="Enter sold amount"
                  type="text"
                  pattern="^[0-9,]*\.?[0-9]*$"
                  onChange={(e) => field.onChange(formatNumber(e.target.value))}
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
          {form.formState.isSubmitting ? "Submitting..." : "Create new Trade"}
        </Button>
      </form>
    </Form>
  );
}
