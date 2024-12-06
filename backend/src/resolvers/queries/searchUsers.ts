import { z } from "zod";
import type { QueryResolvers } from "../../types";
import { fetchUsersSearchResults } from "../../functions/users.js";

const SearchUsersSchema = z.object({
  query: z.string(),
  page: z.number().int().min(0).optional().default(0),
  pageSize: z.number().int().min(0).optional().default(30),
});

export const searchUsers: QueryResolvers["searchUsers"] = async (_, args) => {
  // Use schema validation to ensure that the arguments are correct
  const { query, page, pageSize } = SearchUsersSchema.parse(args);

  // Convert the page and pageSize to limit and offset
  const limit = pageSize;
  const offset = page * pageSize;

  const searchResults = await fetchUsersSearchResults(query, offset, limit);

  return searchResults;
};
