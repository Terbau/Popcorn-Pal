import type { ComponentProps } from "react";
import { Button, ButtonLeftIcon } from "@/components/atoms/Button/Button";
import { cn } from "@/lib/utils";
import { useUpdateComment } from "@/lib/hooks/useUpdateComment";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LoadingButton } from "../LoadingButton/LoadingButton";
import { TextAreaInput } from "../TextAreaInput/TextAreaInput";

const MIN_COMMENT_LENGTH = 1;
const MAX_COMMENT_LENGTH = 500;

const EditCommentSchema = z.object({
  content: z
    .string()
    .min(
      MIN_COMMENT_LENGTH,
      `The comment must be at least ${MIN_COMMENT_LENGTH} character long`,
    )
    .max(
      MAX_COMMENT_LENGTH,
      `The comment must be at most ${MAX_COMMENT_LENGTH} characters long`,
    ),
});

type FormData = z.infer<typeof EditCommentSchema>;

export interface EditCommentProps
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  commentId: string;
  content: string;
  isOpen: boolean;
  onClose?: () => void;
}

export const EditComment = ({
  commentId,
  content: initialContent,
  isOpen,
  onClose,
  className,
  ...props
}: EditCommentProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(EditCommentSchema),
    defaultValues: {
      content: initialContent,
    },
  });

  const content = watch("content");

  const [updateComment, { loading }] = useUpdateComment({
    onCompleted: () => {
      onClose?.();
      toast.success("Comment edited successfully");
    },
    onError: () => {
      toast.error("Failed to edit comment");
    },
  });

  const onSubmit = (data: FormData) => {
    updateComment({
      variables: {
        id: commentId,
        input: {
          content: data.content,
        },
      },
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      <TextAreaInput
        {...register("content", { required: "Content is required" })}
        placeholder="Edit a comment"
        errorMessage={errors.content?.message}
        aria-invalid={errors.content ? "true" : "false"}
        autoFocus
      />
      <div className="flex flex-row gap-2 items-center">
        <LoadingButton
          type="submit"
          size="sm"
          variant="primary"
          isLoading={loading}
        >
          {!loading && <ButtonLeftIcon icon="fluent:edit-20-regular" />}
          Edit
        </LoadingButton>
        <Button
          type="button"
          size="sm"
          variant="tertiary"
          onClick={onClose}
          aria-label="Close edit comment"
        >
          Close
        </Button>
        <span
          className={cn(
            "ml-auto text-xs",
            content.length > MAX_COMMENT_LENGTH
              ? "text-red-11"
              : "text-brand-11",
          )}
        >
          {content.length} / {MAX_COMMENT_LENGTH}
        </span>
      </div>
    </form>
  );
};
