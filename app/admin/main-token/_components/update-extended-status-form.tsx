"use client";
import { updateMainTokenStatusToExtended } from "@/actions/pooling/main-token.action";
import { DateTimePicker } from "@/components/ui-extension/datetime-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MainToken } from "@/types/pooling.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  poolingEnd: z.date({
    required_error: "Pooling end date is required",
  }),
});

type Props = {
  mainToken: MainToken;
};

export default function UpdateExtendedStatusForm({ mainToken }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poolingEnd: mainToken.poolingEnd,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await updateMainTokenStatusToExtended(mainToken.id, values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Successfully Extended");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="poolingEnd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pooling End Date</FormLabel>
              <FormControl>
                <DateTimePicker
                  hourCycle={12}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Extend"}
        </Button>
      </form>
    </Form>
  );
}
