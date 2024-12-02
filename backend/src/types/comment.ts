import { z } from "zod";
import { PaginationSchema } from "./pagination.js";
import { UserSchema } from "./user.js";

export const CommentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().nullable(),
  movieId: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  parentId: z.string().uuid().nullable(),
  deletedAt: z.date().nullable(),
});

export type Comment = z.infer<typeof CommentSchema>;

export const RecursiveCommentSchema = CommentSchema.extend({
  depth: z.number(),
  totalComments: z.number(),
  user: UserSchema.nullable(),
  voteRatio: z.number(),
  hasUpvoted: z.boolean(),
  hasDownvoted: z.boolean(),
});

export type RecursiveComment = z.infer<typeof RecursiveCommentSchema>;

export const PaginatedCommentsSchema = PaginationSchema(CommentSchema);

export type PaginatedComments = z.infer<typeof PaginatedCommentsSchema>;

export const PaginatedRecursiveCommentsSchema = PaginationSchema(
  RecursiveCommentSchema,
);

export type PaginatedRecursiveComments = z.infer<
  typeof PaginatedRecursiveCommentsSchema
>;

export const CommentVoteSchema = z.object({
  commentId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(["UPVOTE", "DOWNVOTE"]),
});

export type CommentVote = z.infer<typeof CommentVoteSchema>;
