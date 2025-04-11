"use client";

import { createComplanFeeBracket } from "@/actions/accounting/complan-fee-bracket.action";
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
import { Complan } from "@/types/accounting.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  complanId: z.string(),
  purchases: z.coerce.number(),
  initialReferralFeePercentage: z.coerce.number(),
  initialManagementFeePercentage: z.coerce.number(),
  releaseReferralFeePercentage: z.coerce.number(),
  releaseManagementFeePercentage: z.coerce.number(),
});

type Props = {
  complan: Complan;
};

export default function ComplanFeeBracketCreateForm({ complan }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      complanId: complan.id,
      purchases: 0,
      initialReferralFeePercentage: 0,
      initialManagementFeePercentage: 0,
      releaseReferralFeePercentage: 0,
      releaseManagementFeePercentage: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      initialManagementFeePercentage,
      initialReferralFeePercentage,
      releaseManagementFeePercentage,
      releaseReferralFeePercentage,
    } = values;

    const totalFeePercentage =
      initialManagementFeePercentage +
      initialReferralFeePercentage +
      releaseManagementFeePercentage +
      releaseReferralFeePercentage;

    if (totalFeePercentage != complan.totalFeePercentage) {
      toast.error(
        "Total fee percentage must be equal to complan total fee percentage"
      );
      return;
    }

    const result = await createComplanFeeBracket(values);

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
          name={`purchases`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchases</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter number of purchases amount"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`initialReferralFeePercentage`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Referral Fee (%)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter initial referral fee percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`initialManagementFeePercentage`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Management Fee (%)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter initial management fee percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`releaseReferralFeePercentage`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Referral Fee (%)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter release referral fee percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`releaseManagementFeePercentage`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Management Fee (%)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter release management fee percentage"
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
              : "Create new Complan Fees"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
