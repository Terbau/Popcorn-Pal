import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput } from "../components/molecules/TextInput/TextInput";
import { gql, useMutation } from "@apollo/client";
import { LoadingButton } from "../components/molecules/LoadingButton/LoadingButton";
import type { Mutation } from "../__generated__/types";
import { Link, useNavigate } from "react-router-dom";

const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      id
      email
      firstName
      lastName
    }
  }
`;

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

  const [signIn, { loading, error }] = useMutation<Pick<Mutation, "signIn">>(
    SIGN_IN,
    {
      onCompleted: (data) => {
        if (data?.signIn) {
          navigate("/");
        }
      },
    },
  );

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
    <div className="max-w-screen-md p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-8">Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <TextInput
          {...register("email", { required: "Email is required" })}
          label="Email"
          placeholder="Email"
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

        <Link to="/signup" className="text-blue-11 text-sm mt-3">
          Don't have an account? Sign up here
        </Link>

        <LoadingButton type="submit" isLoading={loading}>
          Sign In
        </LoadingButton>

        {error && <p className="text-red-11 text-sm">{error.message}</p>}
      </form>
    </div>
  );
}
