import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import type { Mutation } from "../../__generated__/types";
import { Modal, type ModalProps } from "../molecules/Modal/Modal";
import { TextInput } from "../molecules/TextInput/TextInput";
import { useAuth } from "../../lib/context/authContext";
import type { User } from "../../lib/types/user";
import { LoadingButton } from "../molecules/LoadingButton/LoadingButton";
import { constructUser } from "../layouts/Layout";
import { AvatarInput } from "../molecules/AvatarInput/AvatarInput";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../atoms/Button/Button";
import { toast } from "react-toastify";
import { createInitials } from "../../lib/utils";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

const EditProfileSchema = z.object({
  firstName: z.string().min(2).max(30).optional(),
  lastName: z.string().min(2).max(30).optional(),
  email: z.string().email().optional(),
  avatarFile: z
    .instanceof(FileList)
    .optional()
    .refine(
      (file) =>
        !file ||
        file.length === 0 ||
        ALLOWED_IMAGE_TYPES.includes(file[0].type),
      {
        message: "Only jpeg, png and webp images are allowed",
      },
    )
    .refine(
      (file) => !file || file.length === 0 || file[0].size < MAX_FILE_SIZE,
      {
        message: "File size must be less than 1MB",
      },
    ),
});

type FormData = z.infer<typeof EditProfileSchema>;

const EDIT_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      email
      firstName
      lastName
      avatarUrl
      createdAt
      updatedAt
    }
  }
`;

export const EditProfileModal = ({
  title = "Edit Profile",
  description = "Edit your profile information. Leaving fields blank will not change them.",
  open,
  onOpenChange,
  ...props
}: ModalProps) => {
  const { currentUser, setCurrentUser } = useAuth();
  const [hasClickedRemoveAvatarButton, setHasClickedRemoveAvatarButton] =
    useState(false);
  const [isFormReset, setIsFormReset] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: useMemo(() => {
      return {
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        email: currentUser?.email,
      };
    }, [currentUser]),
  });

  const [editProfile, { loading, error }] = useMutation<
    Pick<Mutation, "updateUser">
  >(EDIT_PROFILE_MUTATION, {
    onCompleted: (data) => {
      if (data.updateUser) {
        setCurrentUser(constructUser(data.updateUser));
        onOpenChange?.(false);
        toast.success("Profile successfully updated");
      }
    },
  });

  const resetForm = useCallback(() => {
    setIsFormReset(true);
    reset(undefined, {
      keepDefaultValues: true,
    });
    setHasClickedRemoveAvatarButton(false);
  }, [reset]);

  const formValues = watch();

  // if avatarFile is set, it has changed. Otherwise check if the avatarUrl
  // is set. If it is, then the avatar has been cleared which counts as a change.
  const hasChangedAvatarFile = useMemo(() => {
    const avatarFileIsSet = !(
      formValues.avatarFile === undefined ||
      (formValues.avatarFile instanceof FileList &&
        formValues.avatarFile?.length === 0)
    );

    if (avatarFileIsSet) {
      return true;
    }

    return currentUser?.avatarUrl !== undefined && hasClickedRemoveAvatarButton;
  }, [
    formValues.avatarFile,
    currentUser?.avatarUrl,
    hasClickedRemoveAvatarButton,
  ]);

  const hasChanged = useMemo(
    () =>
      Object.entries(formValues).some(([key, value]) => {
        // Special logic for avatarFile
        if (key === "avatarFile") {
          return hasChangedAvatarFile;
        }

        return value !== currentUser?.[key as keyof User];
      }),
    [formValues, currentUser, hasChangedAvatarFile],
  );

  useEffect(() => {
    if (hasChanged) {
      setIsFormReset(false);
    }
  }, [hasChanged]);

  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open, resetForm]);

  useEffect(() => {
    reset({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
    });
  }, [currentUser, reset]);

  if (!currentUser) {
    return null;
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Only include fields that are not undefined and has been changed
    const filteredData = Object.fromEntries(
      Object.entries(data)
        .filter(([key, value]) => {
          // Special logic for avatarFile
          if (key === "avatarFile") {
            return hasChangedAvatarFile;
          }

          // All keys are in User, and if not it will be excluded anyways.
          return (
            value !== undefined && value !== currentUser?.[key as keyof User]
          );
        })
        .map(([key, value]) => {
          // Special logic for avatarFile. If it has a file, then include that. If
          // not, then include null to clear the avatar.
          if (key === "avatarFile") {
            if (value instanceof FileList && value.length > 0) {
              return [key, value[0]];
            }
            return [key, null];
          }

          return [key, value];
        }),
    );

    editProfile({
      variables: {
        input: filteredData,
      },
    });
  };

  return (
    <Modal
      title={title}
      description={description}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="grid grid-cols-[2fr_1fr]">
          <fieldset className="grow flex flex-col gap-3 justify-stretch">
            <TextInput
              {...register("firstName")}
              autoFocus
              label="First name"
              placeholder="First name"
              errorMessage={errors.firstName?.message}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            <TextInput
              {...register("lastName")}
              label="Last name"
              placeholder="Last name"
              errorMessage={errors.lastName?.message}
              aria-invalid={errors.lastName ? "true" : "false"}
            />
          </fieldset>
          <div className="flex justify-center ml-4">
            <AvatarInput
              {...register("avatarFile")}
              currentAvatarUrl={currentUser.avatarUrl ?? undefined}
              fallback={createInitials(
                currentUser.firstName,
                currentUser.lastName,
              )}
              size="4xl"
              label="Avatar"
              labelAlignment="center"
              onRemoveButtonClick={() => setHasClickedRemoveAvatarButton(true)}
              isFormReset={isFormReset}
              errorMessage={errors.avatarFile?.message}
            />
          </div>
        </div>
        <TextInput
          {...register("email")}
          label="Email"
          placeholder="Email"
          type="email"
          errorMessage={errors.email?.message}
          aria-invalid={errors.email ? "true" : "false"}
        />

        <div className="mt-2 flex flex-row gap-2">
          <LoadingButton
            type="submit"
            disabled={!hasChanged}
            variant={hasChanged ? "primary" : "secondary"}
            isLoading={loading}
            className="w-fit"
          >
            Save changes
          </LoadingButton>
          {hasChanged && (
            <Button
              type="reset"
              variant="tertiary"
              color="brand"
              onClick={resetForm}
            >
              Reset
            </Button>
          )}
        </div>

        {error && <p className="text-red-11 text-sm">{error.message}</p>}
      </form>
    </Modal>
  );
};
