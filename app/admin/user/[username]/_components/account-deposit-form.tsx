"use client";

import { createAccountDeposit } from "@/actions/accounting/account-deposit.action";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatNumber } from "@/lib/utils";
import { DepositStatus } from "@/types/accounting.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  userId: z.string({ required_error: "User is required" }),
  amount: z
    .string()
    .transform((value) => value.replace(/,/g, ""))
    .transform((value) => (value === "" ? "" : Number(value)))
    .refine((value) => !isNaN(Number(value)), {
      message: "Expected number, received string",
    }),
  status: z.nativeEnum(DepositStatus),
});

type Props = {
  userId: string;
};

export default function AccountDepositCreateForm({ userId }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId,
      amount: "",
      status: DepositStatus.Approved,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createAccountDeposit(values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Successfully added");
    form.reset();
  }

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
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter amount to deposit"
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
          name="status"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Deposit Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={DepositStatus.Pending}>Pending</SelectItem>
                  <SelectItem value={DepositStatus.Approved}>
                    Approved
                  </SelectItem>
                  <SelectItem value={DepositStatus.Declined}>
                    Declined
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-12 flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Submitting..."
              : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
