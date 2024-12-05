import { z } from "zod";
import { PaginationSchema } from "./pagination.js";

export const RawUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  createdAt: z.date(),
  updatedAt: z.date(),
  password: z.string(),
  avatarUrl: z.string().nullable(),
});

export const UserSchema = RawUserSchema.omit({
  password: true,
});

export const UserSignUpInputSchema = RawUserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
  password: true,
});

export const UserUpdateInputSchema = RawUserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
})
  .extend({
    avatarFile: z.any().optional(),
  })
  .partial();

export type User = z.infer<typeof UserSchema>;

export const PaginatedUsersResponseSchema = PaginationSchema(UserSchema);

export type PaginatedUsersResponse = z.infer<
  typeof PaginatedUsersResponseSchema
>;
