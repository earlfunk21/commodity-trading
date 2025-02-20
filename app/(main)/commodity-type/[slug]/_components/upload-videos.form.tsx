"use client";
import { uploadCommodityTypeVideos } from "@/actions/pulling/commodity-type.action";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui-extension/file-upload";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .max(5, {
      message: "Maximum 5 files are allowed",
    })
    .nullable(),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  slug: string;
};

export default function UploadVideosForm({ slug }: Props) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormSchema) => {
    const formData = new FormData();
    if (!values.files) return;
    values.files.forEach((file) => {
      formData.append("files", file);
    });
    const result = await uploadCommodityTypeVideos(slug, formData);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Commodity Video uploaded successfully");
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
                    "video/*": [
                      ".mp4",
                      ".mov",
                      ".wmv",
                      ".flv",
                      ".avi",
                      ".mkv",
                      ".webm",
                    ],
                  },
                }}
                reSelect={true}>
                <FileInput className="border border-input">
                  <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                    <FileSvgDraw />
                  </div>
                </FileInput>
                {field.value && field.value.length > 0 && (
                  <FileUploaderContent>
                    {field.value.map((file, i) => (
                      <FileUploaderItem key={i} index={i}>
                        <Paperclip className="h-4 w-4 stroke-current" />
                        <span>{file.name}</span>
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
        MP4, MOV, WMV, FLV, AVI, MKV AND WEBM
      </p>
    </>
  );
};
