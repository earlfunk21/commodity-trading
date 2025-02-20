"use client";
import { uploadCommodityTypeImages } from "@/actions/pulling/commodity-type.action";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui-extension/file-upload";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  files: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: "File size must be less than 4MB",
      })
    )
    .max(5, {
      message: "Maximum 5 files are allowed",
    })
    .nullable(),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  slug: string;
};

export default function UploadImagesForm({ slug }: Props) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormSchema) => {
    const formData = new FormData();
    if (!values.files) return;
    values.files.forEach((file) => {
      formData.append("files", file);
    });
    const result = await uploadCommodityTypeImages(slug, formData);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Commodity Image uploaded successfully");
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FileUploader
                value={field.value}
                onValueChange={(e) => {
                  field.onChange(e);
                }}
                dropzoneOptions={{
                  multiple: true,
                  maxFiles: 6,
                  accept: {
                    "image/*": [".jpg", ".jpeg", ".png"],
                  },
                }}
                reSelect={true}>
                <FileInput className="border border-input">
                  <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                    <FileSvgDraw />
                  </div>
                </FileInput>
                {field.value && field.value.length > 0 && (
                  <FileUploaderContent className="flex items-center flex-row gap-2">
                    {field.value.map((file, i) => (
                      <FileUploaderItem
                        key={i}
                        index={i}
                        className="size-20 p-0 rounded-md overflow-hidden"
                        aria-roledescription={`file ${i + 1} containing ${
                          file.name
                        }`}>
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          height={80}
                          width={80}
                          className="size-20 p-0"
                        />
                      </FileUploaderItem>
                    ))}
                  </FileUploaderContent>
                )}
              </FileUploader>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={form.formState.isSubmitting}>
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
