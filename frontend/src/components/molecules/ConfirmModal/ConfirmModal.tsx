import {
  AlertDialog,
  type AlertDialogAction,
  type AlertDialogProps,
} from "../AlertDialog/AlertDialog";

type ConfirmModalType = "confirm" | "delete";

export interface ConfirmModalProps extends Omit<AlertDialogProps, "actions"> {
  type?: ConfirmModalType;
  onConfirm: () => void;
  onCancel: () => void;
}

const availableTypes: Record<
  ConfirmModalType,
  Omit<AlertDialogAction, "onClick">
> = {
  confirm: {
    label: "Confirm",
    color: "brand",
    variant: "primary",
  },
  delete: {
    label: "Delete",
    color: "red",
    variant: "primary",
  },
};

export const ConfirmModal = ({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  type = "confirm",
  onConfirm,
  onCancel,
  ...props
}: ConfirmModalProps) => {
  const actions: AlertDialogAction[] = [
    {
      label: "Cancel",
      color: "brand",
      variant: "secondary",
      onClick: () => onCancel?.(),
    },
    {
      ...availableTypes[type],
      onClick: () => onConfirm?.(),
    },
  ];

  return (
    <AlertDialog
      title={title}
      description={description}
      actions={actions}
      {...props}
    />
  );
};
