import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

// Get your free API key from https://www.omdbapi.com/apikey.aspx
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = "https://www.omdbapi.com/";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [useInfinite, setUseInfinite] = useState(true);

  // Fetch movies from API
  const fetchMovies = useCallback(async (search, pageNum) => {
    if (!search.trim()) {
      setError("Please enter a movie title to search");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL, {
        params: {
          apikey: API_KEY,
          s: search,
          page: pageNum,
          type: "movie",
        },
      });

      if (response.data.Response === "True") {
        const newMovies = response.data.Search;

        if (pageNum === 1) {
          setMovies(newMovies);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        }

        setTotalResults(parseInt(response.data.totalResults));
        setHasMore(pageNum * 10 < parseInt(response.data.totalResults));
      } else {
        setError(response.data.Error || "No movies found");
        if (pageNum === 1) {
          setMovies([]);
        }
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle search
  const handleSearch = useCallback(
    (term) => {
      setSearchTerm(term);
      setPage(1);
      setMovies([]);
      fetchMovies(term, 1);
    },
    [fetchMovies]
  );

  // Load more movies
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(searchTerm, nextPage);
  };

  // USE INFINITE SCROLL HERE
  useInfiniteScroll(loadMore, hasMore, loading);

  // Fetch popular movies on initial load
  useEffect(() => {
    handleSearch("Marvel"); // Default search
  }, [handleSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              🎬 Movie Search App
            </span>
          </h1>
          <SearchBar onSearch={handleSearch} />

          {/* Toggle Infinite Scroll */}
          <div className="flex justify-center mt-4">
            <label className="flex items-center text-white cursor-pointer">
              <input
                type="checkbox"
                checked={useInfinite}
                onChange={(e) => setUseInfinite(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Enable Infinite Scroll</span>
            </label>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Error Message */}
        {error && !loading && <ErrorMessage message={error} />}

        {/* Results Count */}
        {totalResults > 0 && !loading && (
          <div className="text-white text-center mb-6">
            <p className="text-lg">
              Found{" "}
              <span className="font-bold text-blue-400">{totalResults}</span>{" "}
              results
              {searchTerm && (
                <span>
                  {" "}
                  for "<span className="font-semibold">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>
        )}

        {/* Movie List */}
        {movies && movies.length > 0 && <MovieList movies={movies} />}

        {/* Loading Spinner */}
        {loading && <LoadingSpinner />}

        {/* Load More Button */}
        {hasMore && !loading && movies.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Load More Movies
            </button>
          </div>
        )}

        {/* No more results message */}
        {!hasMore && movies.length > 0 && (
          <div className="text-center text-gray-400 mt-8">
            <p>You've reached the end of the results</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/50 text-center text-gray-400 py-6 mt-12">
        <p>Powered by OMDb API | Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;
