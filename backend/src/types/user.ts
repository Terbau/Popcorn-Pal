import { z } from "zod";

export const RawUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  createdAt: z.date(),
  updatedAt: z.date(),
  password: z.string(),
});

export const UserSchema = RawUserSchema.omit({
  password: true,
});

export const UserSignUpInputSchema = RawUserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
  password: true,
})

export type User = z.infer<typeof UserSchema>;
