import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";

export interface ConfirmDialogButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export type ConfirmOptions = {
  title: React.ReactNode | string;
  description?: React.ReactNode | string;
  confirmButton?: ConfirmDialogButtonProps;
  cancelButton?: ConfirmDialogButtonProps;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  customActions?: (
    onConfirm: () => void,
    onCancel: () => void
  ) => React.ReactNode;
  alertDialog?: React.ComponentPropsWithoutRef<typeof AlertDialog>;
  alertDialogContent?: React.ComponentPropsWithoutRef<
    typeof AlertDialogContent
  >;
  alertDialogHeader?: React.ComponentPropsWithoutRef<typeof AlertDialogHeader>;
  alertDialogTitle?: React.ComponentPropsWithoutRef<typeof AlertDialogTitle>;
  alertDialogDescription?: React.ComponentPropsWithoutRef<
    typeof AlertDialogDescription
  >;
  alertDialogFooter?: React.ComponentPropsWithoutRef<typeof AlertDialogFooter>;
};

export interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

export type ConfirmDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  config: Partial<ConfirmOptions>;
  onConfirm: () => void;
  onCancel: () => void;
};

export type ConfirmDialogProviderProps = {
  defaultOptions: Partial<ConfirmOptions>;
  children: React.ReactNode;
};
export const ConfirmContext = React.createContext<
  ConfirmContextType | undefined
>(undefined);

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onOpenChange,
  config: {
    title,
    description,
    cancelButton,
    confirmButton,
    confirmText = "Confirm",
    cancelText = "Cancel",
    icon,
    customActions,
    alertDialog,
    alertDialogContent,
    alertDialogHeader,
    alertDialogTitle,
    alertDialogDescription,
    alertDialogFooter,
  },
  onConfirm,
  onCancel,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange} {...alertDialog}>
      <AlertDialogContent {...alertDialogContent}>
        <AlertDialogHeader {...alertDialogHeader}>
          <AlertDialogTitle {...alertDialogTitle}>
            {icon && icon}
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription {...alertDialogDescription}>
            {description && description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter {...alertDialogFooter}>
          {customActions ? (
            customActions(onConfirm, onCancel)
          ) : (
            <>
              <AlertDialogCancel asChild>
                <Button
                  onClick={onCancel}
                  {...cancelButton}
                  className={cn(
                    "text-foreground",
                    cancelButton && cancelButton.className
                  )}
                >
                  {cancelText}
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={onConfirm} {...confirmButton}>
                  {confirmText}
                </Button>
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const ConfirmDialogProvider: React.FC<ConfirmDialogProviderProps> = ({
  defaultOptions = {},
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [options, setOptions] =
    React.useState<Partial<ConfirmOptions>>(defaultOptions);
  const [resolver, setResolver] = React.useState<(value: boolean) => void>(
    () => {}
  );

  const confirm = React.useCallback(
    (options: ConfirmOptions) => {
      setOptions({ ...defaultOptions, ...options });
      setIsOpen(true);
      return new Promise<boolean>((resolve) => {
        setResolver(() => resolve);
      });
    },
    [defaultOptions]
  );

  const handleConfirm = React.useCallback(() => {
    setIsOpen(false);
    resolver(true);
  }, [resolver]);

  const handleCancel = React.useCallback(() => {
    setIsOpen(false);
    resolver(false);
  }, [resolver]);

  const contextValue = React.useMemo(() => ({ confirm }), [confirm]);

  return (
    <ConfirmContext.Provider value={contextValue}>
      {children}

      <ConfirmDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        config={options}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = React.useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmDialogProvider");
  }

  return context.confirm;
};
