import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  CircleFadingArrowUpIcon,
  OctagonAlert,
  ShieldAlert,
} from "lucide-react";

type Props = {
  title: string;
};

export function AlertError({ title }: Props) {
  return (
    <Alert className="bg-destructive/10 dark:bg-destructive/20">
      <div className="flex items-center gap-2">
        <OctagonAlert className="h-4 w-4 !text-rose-500" />
        <AlertTitle className="mb-0">{title}</AlertTitle>
      </div>
    </Alert>
  );
}
export function AlertWarning({ title }: Props) {
  return (
    <Alert className="bg-amber-500/10 dark:bg-amber-600/30 border-amber-300 dark:border-amber-600/70">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 !text-amber-500" />
        <AlertTitle className="mb-0">{title}</AlertTitle>
      </div>
    </Alert>
  );
}
export function AlertInfo({ title }: Props) {
  return (
    <Alert className="bg-blue-500/10 dark:bg-blue-600/30 border-blue-300 dark:border-blue-600/70">
      <div className="flex items-center gap-2">
        <CircleFadingArrowUpIcon className="h-4 w-4 !text-blue-500" />
        <AlertTitle className="mb-0">{title}</AlertTitle>
      </div>
    </Alert>
  );
}
export function AlertSuccess({ title }: Props) {
  return (
    <Alert className="bg-emerald-500/10 dark:bg-emerald-600/30 border-emerald-300 dark:border-emerald-600/70">
      <div className="flex items-center gap-2">
        <CircleFadingArrowUpIcon className="h-4 w-4 !text-emerald-500" />
        <AlertTitle className="mb-0">{title}</AlertTitle>
      </div>
    </Alert>
  );
}
