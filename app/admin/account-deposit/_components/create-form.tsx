"use client";

import { createAccountDeposit } from "@/actions/accounting/account-deposit.action";
import { getUserList } from "@/actions/core/user.action";
import { AutoComplete } from "@/components/ui-extension/auto-complete";
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
import { DepositStatus } from "@/types/accounting.type";
import { User } from "@/types/core.type";
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

export default function AccountDepositCreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
          name="userId"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-4">
              <FormLabel>User</FormLabel>
              <FormControl>
                <AutoComplete
                  name="user"
                  value={field.value}
                  onChange={field.onChange}
                  getData={async (searchValue) => {
                    const result = await getUserList({
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
                  label={(item: User) => item.username}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter amount to deposit" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
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
              : "Create new Account Deposit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
