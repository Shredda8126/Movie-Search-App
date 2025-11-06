import MovieCard from './MovieCard';
import PropTypes from 'prop-types';

const MovieList = ({ movies = [] }) => {
  // Guard clause for empty or invalid data
  if (!Array.isArray(movies) || movies.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie, index) => (
        <MovieCard 
          key={movie.imdbID} 
          movie={movie} 
        />
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string,
      Poster: PropTypes.string,
      Type: PropTypes.string
    })
  )
};

export default MovieList;