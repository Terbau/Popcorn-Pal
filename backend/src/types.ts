import type { ServerResponse } from "node:http";
import type { SessionValidationResult } from "./types/auth";
import type {
  QueryResolvers as GeneratedQueryResolvers,
  MutationResolvers as GeneratedMutationResolvers,
} from "./generated/types";

export type CustomContext = {
  res: ServerResponse;
} & SessionValidationResult;

export type QueryResolvers = GeneratedQueryResolvers<CustomContext>;
export type MutationResolvers = GeneratedMutationResolvers<CustomContext>;
