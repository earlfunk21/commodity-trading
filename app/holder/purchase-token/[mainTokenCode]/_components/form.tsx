"use client";

import { createPurchaseTokenByHolder } from "@/actions/pooling/purchase-token.action";
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
import { Complan } from "@/types/accounting.type";
import { MainToken } from "@/types/pooling.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
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
};

export default function PurchaseTokenForm({ mainToken, complan }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
            </FormItem>
          )}
        />

        <FormItem className="col-span-12">
          <FormLabel>Number of Tokens</FormLabel>
          <FormControl>
            <Input
              value={
                !!amount
                  ? formatNumber(
                      (Number(String(amount).replace(/,/g, "")) *
                        (complan.capital / 100)) /
                        mainToken.unitValue
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
