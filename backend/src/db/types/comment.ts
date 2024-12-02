import type { Generated } from "kysely";

export interface Comment {
  id: Generated<string>;
  movieId: string;
  userId: string;
  content: string;
  parentId: string | null;
  createdAt: Generated<Date>;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export interface CommentVote {
  commentId: string;
  userId: string;
  type: "UPVOTE" | "DOWNVOTE";
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}
