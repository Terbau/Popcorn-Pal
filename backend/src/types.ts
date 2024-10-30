import type { GraphQLResolveInfo } from "graphql";
import type { ServerResponse } from "node:http";
import type { SessionValidationResult } from "./types/auth";
import type { Query, Mutation } from "./__generated__/types";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any
  ? U
  : // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    any;

export type MyContext = {
  res: ServerResponse;
} & SessionValidationResult;

export type Remapped<T> = {
  [P in keyof T]: (
    parent: null | undefined,
    args: FirstArgument<T[P]>,
    ctx: MyContext,
    info?: GraphQLResolveInfo,
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  ) => any;
};

export type RemappedQuery = Partial<Remapped<Query>>;
export type RemappedMutation = Partial<Remapped<Mutation>>;
