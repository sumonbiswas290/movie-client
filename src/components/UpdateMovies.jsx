import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";

function UpdateMovies() {
    const movie = useLoaderData()
    const navigate = useNavigate()
    const { _id, photo, genre, title, time, date, summary, rating } = movie;
    const [formData, setFormData] = useState({
        imageUrl: "",
        title: "",
        genre: "",
        duration: "",
        releaseYear: "",
        rating: 0,
        summary: "",
    });

    const [errors, setErrors] = useState({});

    const genres = ["Comedy", "Drama", "Horror", "Action", "Sci-Fi", "Thriller"];
    const years = [2024, 2023, 2022, 2021, 2020, 2019];


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const photo = form.photo.value;
        const genre = form.genre.value;
        const title = form.title.value;
        const time = form.time.value;
        const date = form.relesedate.value;
        const rating = form.rating.value;
        const summary = form.summary.value;
        const data = { photo, genre, title, time, date, summary, rating }
        // console.log(data);
        fetch(`http://localhost:5000/movie/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0){
                    console.log(data);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Movie is Updated',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                }
                navigate('/allmovie')
            })
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">Update Movie: {_id}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image URL */}
                <div>
                    <label className="block font-semibold">Movie Poster URL</label>
                    <input
                        type="text"
                        name="photo"
                        defaultValue={photo}
                        className="w-full p-2 border rounded"
                    />
                    {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
                </div>

                {/* Title */}
                <div>
                    <label className="block font-semibold">Movie Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={title}
                        className="w-full p-2 border rounded"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Genre */}
                <div>
                    <label className="block font-semibold">Genre</label>
                    <select
                        name='genre'
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        className="w-full p-2 border rounded"

                    >
                        <option value="">Select Genre</option>
                        {genres.map((genre) => (
                            <option key={genre} defaultValue={genre}  value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                    {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
                </div>

                {/* Duration */}
                <div>
                    <label className="block font-semibold">Duration (minutes)</label>
                    <input
                        type="number"
                        name="time"
                        defaultValue={time}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                </div>

                {/* Release Year */}
                <div>
                    <label className="block font-semibold">Release Year</label>
                    <select
                        name="relesedate"
                        defaultValue={date}
                        onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year} defaultValue={time} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    {errors.releaseYear && <p className="text-red-500 text-sm">{errors.releaseYear}</p>}
                </div>

                {/* Rating */}
                <div>
                    <label className="block font-semibold">Rating</label>
                    <input type="number" defaultValue={parseInt(rating)} name="rating" className="w-full p-2 border rounded" />
                    {/* <Rating
                        name="rating"
                        onClick={(rate) => setFormData({ ...formData, rating: rate })}
                        ratingValue={formData.rating}
                        allowHalfIcon
                    /> */}
                    {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                </div>

                {/* Summary */}
                <div>
                    <label className="block font-semibold">Summary</label>
                    <textarea
                        defaultValue={summary}
                        name="summary"
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.summary && <p className="text-red-500 text-sm">{errors.summary}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Update Movie
                </button>
            </form>
        </div>
    );
}

export default UpdateMovies;
