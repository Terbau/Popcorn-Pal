import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { LoadingButton } from "../LoadingButton/LoadingButton";
import type { ButtonColor } from "../../atoms/Button/Button";

interface AlertDialogAction {
  variant?: "primary" | "secondary" | "tertiary";
  color?: ButtonColor;
  label: string;
  isLoading?: boolean;
  onClick: () => void;
}

interface AlertDialogProps extends RadixAlertDialog.AlertDialogProps {
  title?: string;
  description?: string;
  actions: AlertDialogAction[];
}

export const AlertDialog = ({
  title,
  description,
  ...props
}: AlertDialogProps) => {
  return (
    <RadixAlertDialog.Root {...props}>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]"/>
        <RadixAlertDialog.Content className="p-6 bg-brand-3 rounded-lg shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9/12 max-w-96 max-h-[85vh] animate-[contentShow_150ms_cubic-bezier(0.16,1,0.3,1)]">
          {title && (
            <RadixAlertDialog.Title className="text-lg font-semibold">
              {title}
            </RadixAlertDialog.Title>
          )}
          {description && (
            <RadixAlertDialog.Description className="text-sm">
              {description}
            </RadixAlertDialog.Description>
          )}
          <div className="flex flex-row items-center justify-end w-full mt-4 gap-2">
            {props.actions.map((action, index) => (
              <RadixAlertDialog.Action key={`${action.label}-${index}`} asChild>
                <LoadingButton
                  variant={action.variant ?? "secondary"}
                  color={action.color}
                  isLoading={action.isLoading ?? false}
                  onClick={action.onClick}
                >
                  {action.label}
                </LoadingButton>
              </RadixAlertDialog.Action>
            ))}
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};
