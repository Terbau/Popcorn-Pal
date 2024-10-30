import { z } from "zod";
import type { User } from "./user";

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export const SessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  expiresAt: z.date(),
});

export type Session = z.infer<typeof SessionSchema>;
