"use client";

import { updateComplan } from "@/actions/accounting/complan.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    commission: z.coerce.number(),
    tax: z.coerce.number(),
    totalFeePercentage: z.coerce.number(),
    capital: z.coerce.number(),
    itManagement: z.coerce.number(),
    partnersManagement: z.coerce.number(),
    tpcpiReferrerManagement: z.coerce.number(),
    tpcpiManagement: z.coerce.number(),
  })
  .refine(
    (data) => {
      const totalPercentage =
        Number(data.commission) +
        Number(data.tax) +
        Number(data.totalFeePercentage) +
        Number(data.capital);
      return totalPercentage === 100;
    },
    {
      message:
        "The sum of commission, tax, referral, management, and capital must be 100%",
      path: ["commission"], // Updated to use an actual field name
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
      path: ["itManagement"],
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
      totalFeePercentage: complan.totalFeePercentage,
      capital: complan.capital,
      itManagement: complan.itManagement,
      partnersManagement: complan.partnersManagement,
      tpcpiReferrerManagement: complan.tpcpiReferrerManagement,
      tpcpiManagement: complan.tpcpiManagement,
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
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the name for this commission plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter complan name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Commission Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Commission Distribution</CardTitle>
            <CardDescription>
              Define how the 100% of commission is distributed
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="commission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission (%)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter commission percentage"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax (%)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter tax percentage"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalFeePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total fee percentage (%)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter total fee percentage percentage"
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
                <FormItem>
                  <FormLabel>Capital (%)</FormLabel>
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
          </CardContent>
        </Card>

        {/* Management Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Management Fee Distribution</CardTitle>
            <CardDescription>
              Define how the management fee is distributed (must total 100%)
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="itManagement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IT Management (%)</FormLabel>
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
                <FormItem>
                  <FormLabel>Partners Management (%)</FormLabel>
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
                <FormItem>
                  <FormLabel>TPCPI Referrer Management (%)</FormLabel>
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
                <FormItem>
                  <FormLabel>TPCPI Management (%)</FormLabel>
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
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Update Complan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
