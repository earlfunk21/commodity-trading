"use client";

import { createPurchaseTokenByHolder } from "@/actions/pooling/purchase-token.action";
import { Button } from "@/components/ui/button";
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
import { currency, formatNumber } from "@/lib/utils";
import { Complan } from "@/types/accounting.type";
import { MainToken } from "@/types/pooling.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  commodityId: z.string({ required_error: "Commodity is required" }),
  commodityTypeId: z.string({ required_error: "Commodity Type is required" }),
  mainTokenId: z.string({ required_error: "Main Token is required" }),
  amount: z
    .string()
    .transform((value) => value.replace(/,/g, ""))
    .transform((value) => (value === "" ? "" : Number(value)))
    .refine((value) => !isNaN(Number(value)), {
      message: "Expected number, received string",
    }),
});

type Props = {
  mainToken: MainToken;
  complan: Complan;
  balance: number;
};

export default function PurchaseTokenForm({
  mainToken,
  complan,
  balance,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commodityId: mainToken.commodityId,
      commodityTypeId: mainToken.commodityTypeId,
      mainTokenId: mainToken.id,
      amount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createPurchaseTokenByHolder(values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Successfully added");
    form.reset();
  }

  const amount = form.watch("amount");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Purchase Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter amount"
                  type="text"
                  pattern="^[0-9,]*\.?[0-9]*$"
                  onChange={(e) => field.onChange(formatNumber(e.target.value))}
                />
              </FormControl>
              <FormMessage />
              <div className="flex justify-between">
                <FormDescription>
                  {balance
                    ? `Your balance: ${currency(
                        balance - Number(String(amount).replace(/,/g, ""))
                      )}`
                    : "Please deposit first or contact the admin."}
                </FormDescription>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto flex items-center gap-1">
                  <PlusIcon />
                  Deposit
                </Button>
              </div>
            </FormItem>
          )}
        />

        <FormItem className="col-span-12">
          <FormLabel>Number of Tokens</FormLabel>
          <FormControl>
            <Input
              value={
                !!mainToken.currentTokenValue && !!amount
                  ? formatNumber(
                      (Number(String(amount).replace(/,/g, "")) *
                        (complan.capital / 100)) /
                        mainToken.currentTokenValue.unitValue
                    )
                  : ""
              }
              readOnly
              className="bg-muted"
              placeholder="Calculated automatically"
            />
          </FormControl>
        </FormItem>

        <div className="col-span-12 flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Purchase token"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
