import { gql } from "../generated";

export const SIGN_OUT = gql(`
  mutation SignOut {
    signOut
  }
`);

export const SIGN_IN = gql(`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      id
      email
      firstName
      lastName
    }
  }
`);

export const SIGN_UP = gql(`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      id
      email
      firstName
      lastName
    }
  }
`);
