import React, { useState } from 'react';

const MovieCard = ({ movie }) => {
  const [imageError, setImageError] = useState(false);
  const placeholderImage = 'https://via.placeholder.com/300x450/1a1a2e/16213e?text=No+Poster';

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imageError || movie.Poster === 'N/A' ? placeholderImage : movie.Poster}
          alt={movie.Title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4 text-white">
            <p className="text-sm opacity-90">IMDb ID: {movie.imdbID}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
          {movie.Title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-blue-400 text-sm font-medium">
            {movie.Year}
          </span>
          <span className="text-gray-400 text-xs uppercase tracking-wider">
            {movie.Type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;