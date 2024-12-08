import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const FeaturedMovies = () => {
  const loader = useLoaderData();
  const [movies, setMovies] = useState(loader)

  const navigate = useNavigate();

  const featuredMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div className="px-4 py-8 w-11/12 mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {featuredMovies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={movie.photo}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
              <p className="text-sm text-gray-600">Genre: {movie.genre}</p>
              <p className="text-sm text-gray-600">Duration: {movie.time} min</p>
              <p className="text-sm text-gray-600">Release Year: {movie.date}</p>
              <p className="text-sm text-gray-600 mb-4">Rating: {movie.rating}</p>
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                  See Details
                </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          className="bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-900 transition"
          onClick={() => navigate("/allmovie")}
        >
          See All Movies
        </button>
      </div>
    </div>
  );
};

export default FeaturedMovies;
