import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput } from "../components/molecules/TextInput/TextInput";
import { useMutation } from "@apollo/client";
import { LoadingButton } from "../components/molecules/LoadingButton/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN } from "@/lib/graphql/mutations/auth";

const UserSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

type FormData = z.infer<typeof UserSignInSchema>;

export default function SignInPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSignInSchema),
  });

  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      if (data?.signIn) {
        navigate("/");
      }
    },
  });

  const onSubmit = (data: FormData) => {
    signIn({
      variables: {
        input: {
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  return (
    <div className="max-w-screen-md p-6 mx-auto" data-cy="sign-in-page">
      <h1
        className="text-2xl font-bold mb-8 text-purple-text dark:text-brand-12"
        data-cy="page-title"
      >
        Sign In
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
        data-cy="sign-in-form"
      >
        <TextInput
          {...register("email", { required: "Email is required" })}
          label="Email"
          placeholder="Email"
          type="email"
          errorMessage={errors.email?.message}
          aria-invalid={errors.email ? "true" : "false"}
          data-cy="email-input" 
        />
        <TextInput
          {...register("password", { required: "Password is required" })}
          label="Password"
          placeholder="Password"
          type="password"
          errorMessage={errors.password?.message}
          aria-invalid={errors.password ? "true" : "false"}
          data-cy="password-input"
        />

        <Link
          to="/signup"
          className="text-blue-11 text-sm mt-3 hover:text-blue-10"
          data-cy="signup-link"
        >
          Don't have an account? Click here to sign up.
        </Link>

        <LoadingButton
          type="submit"
          isLoading={loading}
          data-cy="sign-in-button"
        >
          Sign In
        </LoadingButton>

        {error && (
          <p className="text-red-11 text-sm" data-cy="error-message"> // Cypress ID for error message
            {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
