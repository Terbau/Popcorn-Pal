import React from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useMovies } from "../lib/hooks/useMovies";
import { MovieGrid } from "../components/molecules/MovieGrid";
import { Pagination } from "@/components/molecules/Pagination/Pagination";

export default function DiscoverPage() {
  // Pagineringstilstand
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(20));

  // Hent filmer basert på side og sideantall
  const { movies, totalResults, loading } = useMovies({
    page: page - 1, // API bruker 0-indeksering
    pageSize,
  });

  // Beregn totalt antall sider
  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="max-w-screen-lg w-[90vw] mx-auto">
      <h1 className="text-2xl font-bold mb-8 pt-8" data-cy="page-title">
        My Favorites
      </h1>

      {/* MovieGrid for å vise filmene */}
      <MovieGrid movies={movies} isLoading={loading} />

      {/* Paginering for å navigere mellom sidene */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(pageNum) => setPage(pageNum)}
          className="mt-8"
        />
      )}
    </div>
  );
}
