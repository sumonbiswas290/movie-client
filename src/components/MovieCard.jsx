import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const MovieCard = ({ movies, setMovies, movie }) => {
    const { _id, photo, genre, title, time, date, summary, rating } = movie;
    const handleDetails = (_id) => {
        fetch(`http://localhost:5000/movie/${_id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
        })
    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={photo}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-between">
                    {title}
                    {parseInt(date, 10) === 2024 && <div className="badge badge-secondary">NEW</div>}
                </h2>
                <p>Time: {time}</p>
                <p>Genere: {genre}</p>
                <p>Release Year: {date}</p>
                <p>Rating: {rating}</p>
                <small>{summary}</small>
                <NavLink to={`/moviedetais/${_id}`}>
                    <button onClick={() => handleDetails(movie._id)} className='btn bg-teal-400 text-center'>See Details</button>
                </NavLink>
            </div>
        </div>
    );
};

export default MovieCard;