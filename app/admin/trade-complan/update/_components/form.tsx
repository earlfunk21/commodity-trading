"use client";

import { updateTradeComplan } from "@/actions/accounting/trade-complan.action";
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
import { TradeComplan } from "@/types/accounting.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string({ required_error: "Name trade complan is required" }),
  itManagement: z.coerce.number(),
  tpctiManagement: z.coerce.number(),
  vat: z.coerce.number(),
  serviceCharge: z.coerce.number(),
});

type Props = {
  tradeComplan: TradeComplan;
};

export default function TradeComplanUpdateForm({ tradeComplan }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tradeComplan.name,
      itManagement: tradeComplan.itManagement,
      tpctiManagement: tradeComplan.tpctiManagement,
      vat: tradeComplan.vat,
      serviceCharge: tradeComplan.serviceCharge,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await updateTradeComplan(tradeComplan.id, values);

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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter trade complan name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itManagement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IT Management (%)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter IT management percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tpctiManagement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TPCPI Management (%)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter TPCTI percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceCharge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Charge (%)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter Service Charge percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>VAT (%)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter vat percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Submitting..."
              : "Update TradeComplan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
