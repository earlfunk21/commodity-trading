"use client";
import { removeNewsEventImage } from "@/actions/pooling/news-event.action";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import React from "react";

type Props = {
  newsEventId: string;
  image: string;
  children: React.ReactNode;
};

export default function RemoveNewsEventImage({
  newsEventId,
  image,
  children,
}: Props) {
  const handleRemoveImage = async () => {
    await removeNewsEventImage(newsEventId, image);
  };
  return (
    <div
      key={image}
      className="relative group overflow-hidden border rounded-md">
      {children}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Button
          type="button"
          onClick={handleRemoveImage}
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-3 py-2 rounded-md text-sm flex items-center gap-2">
          <XIcon className="h-4 w-4" />
          Remove
        </Button>
      </div>
    </div>
  );
}
