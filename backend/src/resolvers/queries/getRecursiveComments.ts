import { z } from "zod";
import type { QueryResolvers } from "../../types";
import { fetchCommentsRecursively } from "../../functions/comments.js";

const GetRecursiveCommmentsSchema = z.object({
  movieId: z.string(),
  parentId: z.string().nullable().optional(),
  limitAtDepth: z.number().int().min(0).optional().default(3),
  maxDepth: z.number().int().min(0).max(6).optional().default(2),
  page: z.number().int().min(0).optional().default(0),
  pageSize: z.number().int().min(0).optional().default(30),
  orderDirection: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const getRecursiveComments: QueryResolvers["getRecursiveComments"] =
  async (_, args, { user }) => {
    // Use schema validation to ensure that the arguments are correct
    const {
      movieId,
      parentId,
      limitAtDepth,
      maxDepth,
      page,
      pageSize,
      orderDirection,
    } = GetRecursiveCommmentsSchema.parse(args);

    const paginatedComments = await fetchCommentsRecursively(
      movieId,
      parentId ?? null,
      maxDepth,
      pageSize,
      page * pageSize,
      limitAtDepth,
      orderDirection,
      user?.id,
    );

    return {
      ...paginatedComments,
      movieId,
      parentId,
    };
  };
