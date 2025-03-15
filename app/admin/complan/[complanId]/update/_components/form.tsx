"use client";

import { updateComplan } from "@/actions/accounting/complan.action";
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

const formSchema = z
  .object({
    name: z.string({ required_error: "Name of the complan is required" }),
    referral: z
      .string()
      .transform((value) => (value === "" ? "" : Number(value)))
      .refine((value) => !isNaN(Number(value)), {
        message: "Expected number, received string",
      }),
    management: z
      .string()
      .transform((value) => (value === "" ? "" : Number(value)))
      .refine((value) => !isNaN(Number(value)), {
        message: "Expected number, received string",
      }),
    pooling: z
      .string()
      .transform((value) => (value === "" ? "" : Number(value)))
      .refine((value) => !isNaN(Number(value)), {
        message: "Expected number, received string",
      }),
    capital: z
      .string()
      .transform((value) => (value === "" ? "" : Number(value)))
      .refine((value) => !isNaN(Number(value)), {
        message: "Expected number, received string",
      }),
    itManagement: z
      .string()
      .transform((value) => (value === "" ? "" : Number(value)))
      .refine((value) => !isNaN(Number(value)), {
        message: "Expected number, received string",
      }),
    partnersManagement: z
      .string()
      .transform((value) => (value === "" ? "" : Number(value)))
      .refine((value) => !isNaN(Number(value)), {
        message: "Expected number, received string",
      }),
    tpcpiReferrerManagement: z
      .string()
      .transform((value) => (value === "" ? "" : Number(value)))
      .refine((value) => !isNaN(Number(value)), {
        message: "Expected number, received string",
      }),
    tpcpiManagement: z
      .string()
      .transform((value) => (value === "" ? "" : Number(value)))
      .refine((value) => !isNaN(Number(value)), {
        message: "Expected number, received string",
      }),
  })
  .refine(
    (data) => {
      const totalPercentage =
        Number(data.referral) +
        Number(data.management) +
        Number(data.pooling) +
        Number(data.capital);
      return totalPercentage === 100;
    },
    {
      message:
        "The sum of referral, management, pooling, and capital must be 100%",
      path: ["referral"], // Show error on first field
    }
  )
  .refine(
    (data) => {
      const managementPercentage =
        Number(data.itManagement) +
        Number(data.partnersManagement) +
        Number(data.tpcpiReferrerManagement) +
        Number(data.tpcpiManagement);
      return managementPercentage === 100;
    },
    {
      message:
        "The sum of IT Management, Partners Management, TPCPI Referrer Management, and TPCPI Management must be 100%",
      path: ["itManagement"], // Show error on first field
    }
  );

type Props = {
  complan: Complan;
};

export default function ComplanUpdateForm({ complan }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: complan.name,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await updateComplan(complan.id, values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Successfully updated");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter complan name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referral"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Referral</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter referral percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="management"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Management</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter management percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pooling"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Pooling</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter pooling percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capital"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Capital</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter capital percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itManagement"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>IT Management</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter IT management percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="partnersManagement"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Partners Management</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter partners management percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tpcpiReferrerManagement"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>TPCPI Referrer Management</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter TPCPI referrer management percentage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tpcpiManagement"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>TPCPI Management</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter TPCPI management percentage"
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
          {form.formState.isSubmitting ? "Submitting..." : "Submit New Complan"}
        </Button>
      </form>
    </Form>
  );
}
