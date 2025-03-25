"use client";

import { createMainTokenValue } from "@/actions/pooling/main-token-value.action";
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
import { MainToken } from "@/types/pooling.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  commodityId: z.string({ required_error: "Commodity is required" }),
  commodityTypeId: z.string({ required_error: "Commodity Type is required" }),
  mainTokenId: z.string({ required_error: "Main Token is required" }),
  unitValue: z
    .string()
    .transform((value) => value.replace(/,/g, ""))
    .transform((value) => (value === "" ? "" : Number(value))),
});

type Props = {
  mainToken: MainToken;
};

export default function MainTokenValueCreateForm({ mainToken }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commodityId: mainToken.commodityId,
      commodityTypeId: mainToken.commodityTypeId,
      mainTokenId: mainToken.id,
      unitValue: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createMainTokenValue(values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Successfully added");
    form.reset();
  }

  const unitValue = form.watch("unitValue");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem className="col-span-12 md:col-span-3">
          <FormLabel>Total Value</FormLabel>
          <FormControl>
            <Input
              value={
                !!mainToken.currentTokenValue
                  ? formatNumber(mainToken.currentTokenValue.totalValue)
                  : ""
              }
              readOnly
              placeholder="Enter total value"
              type="text"
              pattern="^[0-9,]*\.?[0-9]*$"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="unitValue"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>Unit Value</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={formatNumber(field.value)}
                  placeholder="Enter unit value"
                  type="text"
                  pattern="^[0-9,]*\.?[0-9]*$"
                  onChange={(e) => field.onChange(formatNumber(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="col-span-12 md:col-span-3">
          <FormLabel>Quantity/Tokens</FormLabel>
          <FormControl>
            <Input
              value={
                !!mainToken.currentTokenValue && !!unitValue
                  ? formatNumber(
                      (mainToken.currentTokenValue.totalValue - (mainToken.currentTokenValue.soldTokens * mainToken.currentTokenValue.unitValue)) /
                        Number(String(unitValue).replace(/,/g, ""))
                    )
                  : ""
              }
              readOnly
              className="bg-muted"
              placeholder="Calculated automatically"
            />
          </FormControl>
          <p className="text-sm text-muted-foreground">
            Auto-calculated from Total Value / Unit Value
          </p>
        </FormItem>

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
