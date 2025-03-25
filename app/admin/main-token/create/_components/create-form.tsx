"use client";

import { getComplanList } from "@/actions/accounting/complan.action";
import { getCommodityTypeList } from "@/actions/pooling/commodity-type.action";
import { getCommodityList } from "@/actions/pooling/commodity.action";
import { createMainToken } from "@/actions/pooling/main-token.action";
import { AutoComplete } from "@/components/ui-extension/auto-complete";
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
import { Input } from "@/components/ui/input";
import { formatNumber } from "@/lib/utils";
import { Complan } from "@/types/accounting.type";
import { Commodity, CommodityType } from "@/types/pooling.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Product Name is required"),
  code: z.string().min(1, "Product Code is required"),
  complanId: z.string({ required_error: "Complan is required" }),
  commodityId: z.string({ required_error: "Commodity is required" }),
  commodityTypeId: z.string({ required_error: "Commodity Type is required" }),
  totalValue: z
    .string()
    .transform((value) => value.replace(/,/g, ""))
    .transform((value) => (value === "" ? "" : Number(value)))
    .refine((value) => !isNaN(Number(value)), {
      message: "Expected number, received string",
    }),
  unitValue: z
    .string()
    .transform((value) => value.replace(/,/g, ""))
    .transform((value) => (value === "" ? "" : Number(value)))
    .refine((value) => !isNaN(Number(value)), {
      message: "Expected number, received string",
    }),
  specs: z.string().min(1, "Unit Type is required"),
  origin: z.string().min(1, "Origin is required"),
  performanceBondNumber: z
    .string()
    .min(1, "Performance Bond Number is required"),
  insurerCompany: z.string().min(1, "Insurer Company is required"),
  insurancePolicyNumber: z
    .string()
    .min(1, "Insurance Policy Number is required"),
  certificateOfStockNumber: z
    .string()
    .min(1, "Certificate Of Stock Number is required"),
  CADTNumber: z.string().min(1, "CADT Number is required"),
  tradingStart: z.date({
    required_error: "Trading start date is required",
  }),
  tradingEnd: z.date({
    required_error: "Trading end date is required",
  }),
  poolingStart: z.date({
    required_error: "Pooling start date is required",
  }),
  poolingEnd: z.date({
    required_error: "Pooling end date is required",
  }),
  tradingDuration: z.date({
    required_error: "Trading duration is required",
  }),
});

export default function MainTokenCreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      specs: "",
      totalValue: "",
      unitValue: "",
      origin: "",
      performanceBondNumber: "",
      insurerCompany: "",
      insurancePolicyNumber: "",
      certificateOfStockNumber: "",
      CADTNumber: "",
      tradingStart: new Date(),
      tradingEnd: new Date(),
      poolingStart: new Date(),
      poolingEnd: new Date(),
      tradingDuration: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createMainToken(values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Successfully added");
    form.reset();
  }

  const commodityId = form.watch("commodityId");
  const totalValue = form.watch("totalValue");
  const unitValue = form.watch("unitValue");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-4">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Product name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-4">
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Product code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="commodityId"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Commodity</FormLabel>
              <FormControl>
                <AutoComplete
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

        <FormField
          control={form.control}
          name="commodityTypeId"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Commodity Type</FormLabel>
              <FormControl>
                <AutoComplete
                  name="commodity type"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={!commodityId}
                  getData={async (searchValue) => {
                    const result = await getCommodityTypeList({
                      search: searchValue,
                      commodityId,
                    });
                    if (result.error) {
                      toast.error("Something went wrong", {
                        description: result.error,
                      });
                      return [];
                    }
                    return result.data;
                  }}
                  label={(item: CommodityType) => item.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specs"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>Specifation</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ex. 24karat" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalValue"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>Total Value</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter total value"
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
          name="unitValue"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>Unit Value</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter unit value"
                  type="text"
                  pattern="^[0-9,]*\.?[0-9]*$"
                  onChange={(e) => field.onChange(formatNumber(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="col-span-12 md:col-span-3">
          <FormLabel>Quantity & Tokens</FormLabel>
          <FormControl>
            <Input
              value={
                !!totalValue && !!unitValue
                  ? formatNumber(
                      (
                        Number(String(totalValue).replace(/,/g, "")) /
                        Number(String(unitValue).replace(/,/g, ""))
                      ).toString()
                    )
                  : ""
              }
              readOnly
              className="bg-muted"
              placeholder="Calculated automatically"
            />
          </FormControl>
          <p className="text-sm text-muted-foreground">
            Auto-calculated from Total Value / Unit Value
          </p>
        </FormItem>

        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-4">
              <FormLabel>Origin</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter origin" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="performanceBondNumber"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-4">
              <FormLabel>Performance Bond Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter performance bond number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="insurerCompany"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>Insurer Company</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter insurer company" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="insurancePolicyNumber"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>Insurance Policy Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Insurance Policy Number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="certificateOfStockNumber"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>Certificate of stock number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter certificate of stock number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="CADTNumber"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-3">
              <FormLabel>
                Certificate of Ancestral Domain Title (CADT) Number
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter CADT Number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="poolingStart"
          render={({ field }) => (
            <FormItem className="flex flex-col col-span-12 md:col-span-6">
              <FormLabel>Pooling Start Date</FormLabel>
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

        <FormField
          control={form.control}
          name="poolingEnd"
          render={({ field }) => (
            <FormItem className="flex flex-col col-span-12 md:col-span-6">
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

        <FormField
          control={form.control}
          name="tradingStart"
          render={({ field }) => (
            <FormItem className="flex flex-col col-span-12 md:col-span-6">
              <FormLabel>Trading Start Date</FormLabel>
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

        <FormField
          control={form.control}
          name="tradingEnd"
          render={({ field }) => (
            <FormItem className="flex flex-col col-span-12 md:col-span-6">
              <FormLabel>Trading End Date</FormLabel>
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

        <FormField
          control={form.control}
          name="tradingDuration"
          render={({ field }) => (
            <FormItem className="flex flex-col  md:col-span-6">
              <FormLabel>Trading Duration</FormLabel>
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

        <div className="col-span-12 flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Submitting..."
              : "Create new Main Token"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
