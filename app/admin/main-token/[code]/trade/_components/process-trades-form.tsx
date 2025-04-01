"use client";

import { getComplanList } from "@/actions/accounting/complan.action";
import { createTradeTransaction } from "@/actions/pooling/trade-transaction.action";
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
import { Complan } from "@/types/accounting.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  mainTokenId: z.string(),
  tradeIds: z.array(z.string()),
  complanId: z.string({ required_error: "Complan is required" }),
});

type Props = {
  mainTokenId: string;
  tradeIds: string[];
  onSuccess: () => void;
};

export default function ProcessTradesForm({
  mainTokenId,
  tradeIds,
  onSuccess,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainTokenId,
      tradeIds,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createTradeTransaction(values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Successfully processed trades");
    form.reset();
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="complanId"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-4">
              <FormLabel>Complan</FormLabel>
              <FormControl>
                <AutoComplete
                  name="complan"
                  value={field.value}
                  onChange={field.onChange}
                  getData={async (searchValue) => {
                    const result = await getComplanList({
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
                  label={(item: Complan) => item.name}
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
          {form.formState.isSubmitting ? "Submitting..." : "Process Trades"}
        </Button>
      </form>
    </Form>
  );
}
