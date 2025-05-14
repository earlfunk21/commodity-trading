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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  mainTokenId: z.string({ required_error: "Main Token is required" }),
  capital: z.coerce.number().min(1, { message: "Capital is required" }),
  soldAmount: z.coerce.number().min(1, { message: "Sold amount is required" }),
  quantity: z.coerce.number().min(1, { message: "Quantity is required" }),
  tpctiPercentage: z.coerce.number().min(1, { message: "TPCTI % is required" }),
  itManagementPercentage: z.coerce
    .number()
    .min(1, { message: "It Management % is required" }),
  vatPercentage: z.coerce.number().min(1, { message: " VAT % is required" }),
});

type Props = {
  mainTokenId: string;
};

export default function TradeCreateForm({ mainTokenId }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainTokenId,
      capital: 0,
      soldAmount: 0,
      quantity: 0,
      tpctiPercentage: 0,
      itManagementPercentage: 0,
      vatPercentage: 1.12,
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
                <Input {...field} placeholder="Enter capital" type="number" />
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
                  placeholder="Enter sold amount"
                  type="number"
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
                <Input {...field} placeholder="Enter quantity" type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tpctiPercentage"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>TPCTI %</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter percentage of TPCTI"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itManagementPercentage"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>It Management %</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter percentage of IT Management"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vatPercentage"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>VAT %</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter percentage of VAT"
                  type="number"
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
