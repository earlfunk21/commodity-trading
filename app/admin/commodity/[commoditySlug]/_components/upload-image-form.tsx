"use client";
import { uploadCommodityImage } from "@/actions/pooling/commodity.action";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui-extension/file-upload";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  file: z
    .instanceof(File, { message: "Please upload a file." })
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: "File size must be less than 4MB",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  slug: string;
};

export default function UploadImageForm({ slug }: Props) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormSchema) => {
    const formData = new FormData();
    formData.append("file", values.file);
    const result = await uploadCommodityImage(slug, formData);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Commodity Image uploaded successfully");
    form.reset();
  };

  const file = form.watch("file");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commodity Image</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value ? [field.value] : null}
                  onValueChange={(value) => {
                    if (value && value[0]) {
                      field.onChange(value[0]);
                    } else {
                      field.onChange(null);
                    }
                  }}
                  dropzoneOptions={{
                    maxFiles: 1,
                    maxSize: 4 * 1024 * 1024,
                    accept: {
                      "image/*": [".jpg", ".jpeg", ".png"],
                    },
                    multiple: false,
                  }}>
                  <FileInput className="border border-input">
                    <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                      <FileSvgDraw />
                    </div>
                  </FileInput>
                  {field.value && (
                    <FileUploaderContent className="flex flex-row flex-wrap gap-2">
                      <FileUploaderItem
                        index={0}
                        aria-roledescription={field.value.name}
                        className="p-0 size-20 border border-input">
                        <AspectRatio className="size-full">
                          <Image
                            src={URL.createObjectURL(field.value)}
                            alt={field.value.name}
                            className="object-cover rounded-md"
                            fill
                          />
                        </AspectRatio>
                      </FileUploaderItem>
                    </FileUploaderContent>
                  )}
                </FileUploader>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={form.formState.isSubmitting || !file}>
          {form.formState.isSubmitting ? "Loading..." : "Upload"}
          <Upload />
        </Button>
      </form>
    </Form>
  );
}

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        PNG, JPG or JPEG
      </p>
    </>
  );
};
