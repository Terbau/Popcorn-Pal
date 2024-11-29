import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput } from "../components/molecules/TextInput/TextInput";
import { useMutation } from "@apollo/client";
import { LoadingButton } from "../components/molecules/LoadingButton/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_UP } from "@/lib/graphql/mutations/auth";

const UserSignUpSchema = z
  .object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof UserSignUpSchema>;

export default function SignUpPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSignUpSchema),
  });

  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      if (data?.signUp) {
        navigate("/");
      }
    },
  });

  const onSubmit = (data: FormData) => {
    signUp({
      variables: {
        input: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  return (
    <div className="max-w-screen-md p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-8">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-row gap-4 [&>div]:grow w-full">
          <TextInput
            {...register("firstName", { required: "First name is required" })}
            className="grow-1"
            label="First Name"
            placeholder="First Name"
            errorMessage={errors.firstName?.message}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <TextInput
            {...register("lastName", { required: "Last name is required" })}
            className="grow-1"
            label="Last Name"
            placeholder="Last Name"
            errorMessage={errors.lastName?.message}
            aria-invalid={errors.email ? "true" : "false"}
          />
        </div>
        <TextInput
          {...register("email", { required: "Email is required" })}
          label="Email"
          placeholder="Email"
          type="email"
          errorMessage={errors.email?.message}
          aria-invalid={errors.email ? "true" : "false"}
        />
        <TextInput
          {...register("password", { required: "Password is required" })}
          label="Password"
          placeholder="Password"
          type="password"
          errorMessage={errors.password?.message}
          aria-invalid={errors.password ? "true" : "false"}
        />
        <TextInput
          {...register("confirmPassword", {
            required: "Confirm password is required",
          })}
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          errorMessage={errors.confirmPassword?.message}
          aria-invalid={errors.confirmPassword ? "true" : "false"}
        />

        <Link
          to="/signin"
          className="text-blue-11 text-sm mt-3 hover:text-blue-10"
        >
          Already have an account? Click here to sign in.
        </Link>

        <LoadingButton type="submit" isLoading={loading}>
          Sign Up
        </LoadingButton>

        {error && <p className="text-red-11 text-sm">{error.message}</p>}
      </form>
    </div>
  );
}
