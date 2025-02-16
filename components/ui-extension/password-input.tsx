import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LockIcon } from "lucide-react";
import React from "react";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2 focus-within:ring-orange-500 bg-zinc-900/50">
      <LockIcon className="h-5 w-5 text-muted-foreground text-orange-500" />
      <Input
        type={show ? "text" : "password"}
        ref={ref}
        {...props}
        className="border-0 focus-visible:ring-0 shadow-none"
      />
      {show ? (
        <EyeOff
          className="h-5 w-5 text-muted-foreground cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        />
      ) : (
        <Eye
          className="h-5 w-5 text-muted-foreground cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        />
      )}
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
