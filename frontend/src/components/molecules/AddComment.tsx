import { type ComponentProps, useContext, useEffect } from "react";
import { TextAreaInput } from "./TextAreaInput/TextAreaInput";
import { Button, ButtonLeftIcon } from "@/components/atoms/Button/Button";
import { cn } from "@/lib/utils";
import { LoadingButton } from "./LoadingButton/LoadingButton";
import { useCreateComment } from "@/lib/hooks/useCreateComment";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ParentIdContext } from "@/components/organisms/CommentsSection";
import type { User } from "@/lib/context/authContext";

const MIN_COMMENT_LENGTH = 1;
const MAX_COMMENT_LENGTH = 500;

const CreateCommentSchema = z.object({
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

type FormData = z.infer<typeof CreateCommentSchema>;

export interface AddCommentProps
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  movieId: string;
  currentUser: User;
  parentId?: string;
  commentPrefix?: string;
  isOpen: boolean;
  onClose?: () => void;
}

export const AddComment = ({
  movieId,
  currentUser,
  parentId,
  commentPrefix = "Comment",
  isOpen,
  onClose,
  className,
  ...props
}: AddCommentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      content: "",
    },
  });

  const rootParentId = useContext(ParentIdContext);
  const content = watch("content");

  const [createComment, { loading }] = useCreateComment(
    { rootParentId, currentUser },
    {
      onCompleted: () => {
        reset();
        onClose?.();
        toast.success("Comment added successfully");
      },
      onError: () => {
        toast.error("Failed to create comment");
      },
    },
  );

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data: FormData) => {
    createComment({
      variables: {
        input: {
          movieId: movieId,
          content: data.content,
          parentId: parentId,
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
        name= "content"
        placeholder={`Write a ${commentPrefix.toLowerCase()}...`}
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
          {!loading && <ButtonLeftIcon icon="material-symbols:send-outline" />}
          {commentPrefix}
        </LoadingButton>
        <Button type="button" size="sm" variant="tertiary" onClick={onClose}>
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
