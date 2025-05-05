"use client";

import { createComplan } from "@/actions/accounting/complan.action";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const feeBracket = z.object({
  purchases: z.coerce.number(),
  initialReferralFeePercentage: z.coerce.number(),
  initialManagementFeePercentage: z.coerce.number(),
  releaseReferralFeePercentage: z.coerce.number(),
  releaseManagementFeePercentage: z.coerce.number(),
});

const formSchema = z
  .object({
    name: z.string({ required_error: "Name of the complan is required" }),
    totalFeePercentage: z.coerce.number(),
    capital: z.coerce.number(),
    itManagement: z.coerce.number(),
    partnersManagement: z.coerce.number(),
    tpcpiReferrerManagement: z.coerce.number(),
    tpcpiManagement: z.coerce.number(),
    feeBrackets: z.array(feeBracket),
  })
  .refine(
    (data) => {
      const totalPercentage =
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
  )
  .refine(
    (data) =>
      data.feeBrackets.every((bracket) => {
        const totalBracketPercentage =
          Number(bracket.initialReferralFeePercentage) +
          Number(bracket.initialManagementFeePercentage) +
          Number(bracket.releaseReferralFeePercentage) +
          Number(bracket.releaseManagementFeePercentage);
        return totalBracketPercentage === data.totalFeePercentage;
      }),
    {
      message:
        "The sum of all percentages in each fee bracket must equal the total fee percentage",
      path: ["feeBrackets"],
    }
  );

export default function ComplanCreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      totalFeePercentage: 0,
      capital: 0,
      itManagement: 0,
      partnersManagement: 0,
      tpcpiReferrerManagement: 0,
      tpcpiManagement: 0,
      feeBrackets: [
        {
          purchases: 0,
          initialReferralFeePercentage: 0,
          initialManagementFeePercentage: 0,
          releaseReferralFeePercentage: 0,
          releaseManagementFeePercentage: 0,
        },
      ],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createComplan(values);

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

        {/* Fee Brackets */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Brackets</CardTitle>
            <CardDescription>
              Define the fee brackets for purchases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {form.watch("feeBrackets").map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="grid grid-cols-5 gap-6 items-center">
                  <FormField
                    control={form.control}
                    name={`feeBrackets.${index}.purchases`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchases</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Enter purchases amount"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`feeBrackets.${index}.initialReferralFeePercentage`}
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
                    name={`feeBrackets.${index}.initialManagementFeePercentage`}
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
                    name={`feeBrackets.${index}.releaseReferralFeePercentage`}
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
                    name={`feeBrackets.${index}.releaseManagementFeePercentage`}
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
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const updatedBrackets = form
                        .getValues("feeBrackets")
                        .filter((_, i) => i !== index);
                      form.setValue("feeBrackets", updatedBrackets);
                    }}>
                    Remove
                  </Button>
                </div>

                {/* Add error message for this specific bracket */}
                {form.formState.errors.feeBrackets && (
                  <div className="text-sm font-medium text-destructive">
                    {(() => {
                      // Calculate the total percentage for this bracket
                      const bracket = form.getValues(`feeBrackets.${index}`);
                      const totalBracketPercentage =
                        Number(bracket.initialReferralFeePercentage) +
                        Number(bracket.initialManagementFeePercentage) +
                        Number(bracket.releaseReferralFeePercentage) +
                        Number(bracket.releaseManagementFeePercentage);
                      const totalFeePercentage = Number(
                        form.getValues("totalFeePercentage")
                      );

                      if (totalBracketPercentage !== totalFeePercentage) {
                        return `This bracket's fees total ${totalBracketPercentage}% but should equal ${totalFeePercentage}%`;
                      }
                      return null;
                    })()}
                  </div>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                form.setValue("feeBrackets", [
                  ...form.getValues("feeBrackets"),
                  {
                    purchases: 0,
                    initialReferralFeePercentage: 0,
                    initialManagementFeePercentage: 0,
                    releaseReferralFeePercentage: 0,
                    releaseManagementFeePercentage: 0,
                  },
                ])
              }>
              Add Fee Bracket
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Submitting..."
              : "Create new Complan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
