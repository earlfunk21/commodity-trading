"use client";

import { updateCommodityType } from "@/actions/pulling/commodity-type.action";
import { getCommodityList } from "@/actions/pulling/commodity.action";
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
import { Textarea } from "@/components/ui/textarea";
import { Commodity, CommodityType } from "@/types/pulling.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Commodity Type Name is required"),
  description: z.string().min(1, "Description is required"),
  commodityId: z.string({ required_error: "Commodity is required" }),
});

type Props = {
  commodityType: CommodityType;
};

export default function CommodityTypeUpdateForm({ commodityType }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: commodityType.name,
      description: commodityType.description,
      commodityId: commodityType.commodityId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await updateCommodityType(commodityType.id, values);

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
                <Input {...field} placeholder="ex. Precious Metal" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="ex. Track real-time metal commodity prices and market changes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commodityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commodity</FormLabel>
              <FormControl>
                <AutoComplete
                  initialData={[commodityType.commodity]}
                  name="commodity"
                  value={field.value}
                  onChange={field.onChange}
                  getData={async (searchValue) => {
                    const result = await getCommodityList({
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
                  label={(item: Commodity) => item.name}
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
          {form.formState.isSubmitting
            ? "Submitting..."
            : "Update Commodity Type"}
        </Button>
      </form>
    </Form>
  );
}
