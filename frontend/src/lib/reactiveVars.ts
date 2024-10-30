import { makeVar } from "@apollo/client";

export const sessionVar = makeVar<string | undefined>(undefined);
