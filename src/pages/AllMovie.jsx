import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const AllMovie = () => {
    const loadersMovies = useLoaderData();
    const [movies, setMovies] = useState(loadersMovies);
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);

        const filteredMovies = loadersMovies.filter(movie => 
            movie.title.toLowerCase().includes(value)
        );
        setMovies(filteredMovies);
    };

    return (
        <div className="w-11/12 mx-auto my-10">
            {/* Search Input */}
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchText}
                    onChange={handleSearch}
                    className="input input-bordered w-full lg:w-1/3 p-2 border rounded-lg text-gray-700"
                />
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center">
                        No movies found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllMovie;
