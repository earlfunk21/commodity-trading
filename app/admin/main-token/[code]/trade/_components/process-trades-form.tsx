"use client";

import { createTradeTransaction } from "@/actions/pooling/trade-transaction.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useSelectTradeIds } from "./use-select-trade";

const formSchema = z.object({
  mainTokenId: z.string(),
});

type Props = {
  mainTokenId: string;
};

export default function ProcessTradesForm({
  mainTokenId,
}: Props) {
  const { selectedIds } = useSelectTradeIds();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainTokenId,
    },
  });
  const confirm = useConfirm();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const confirmed = await confirm({
      title: "Confirm Process Trades",
      description: `Are you sure you want to process ${selectedIds.length} trades?`,
      confirmText: "Process",
      cancelText: "Cancel",
    });

    if (!confirmed) {
      return;
    }

    const result = await createTradeTransaction({
      mainTokenId: values.mainTokenId,
      tradeIds: selectedIds,
    });

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Successfully processed trades");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
