import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";

function AddMovie() {
    const [formData, setFormData] = useState({
        imageUrl: "",
        title: "",
        genre: "",
        duration: "",
        releaseYear: "",
        rating: 0,
        summary: "",
    });
    const naviget = useNavigate();

    const [errors, setErrors] = useState({});

    const genres = ["Comedy", "Drama", "Horror", "Action", "Sci-Fi", "Thriller"];
    const years = [2024, 2023, 2022, 2021, 2020, 2019];

    // Validation
    const validate = () => {
        const errors = {};

        // Validate Image URL
        const imageRegex = /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i;
        try {
            const isValidUrl = new URL(formData.imageUrl);
            if (!imageRegex.test(isValidUrl.pathname)) {
                errors.imageUrl = "Invalid image URL. It must be a valid link.";
            }
        } catch (err) {
            errors.imageUrl = "Invalid URL.";
        }

        // Validate Title
        if (!formData.title.trim() || formData.title.length < 2) {
            errors.title = "Title must be at least 2 characters long.";
        }

        // Validate Genre
        if (!formData.genre) {
            errors.genre = "Please select a genre.";
        }

        // Validate Duration
        if (!formData.duration || formData.duration < 60) {
            errors.duration = "Duration must be at least 60 minutes.";
        }

        // Validate Release Year
        if (!formData.releaseYear) {
            errors.releaseYear = "Please select a release year.";
        }

        // Validate Rating
        if (formData.rating === 0) {
            errors.rating = "Please select a rating.";
        }

        // Validate Summary
        if (!formData.summary.trim() || formData.summary.length < 10) {
            errors.summary = "Summary must be at least 10 characters long.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setFormData({
                imageUrl: "",
                title: "",
                genre: "",
                duration: "",
                releaseYear: "",
                rating: 0,
                summary: "",
            });
            setErrors({});
        }
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
        fetch('http://localhost:5000/movie', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    Swal.fire({
                        title: 'Success!',
                        text: 'Movie is added',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                      naviget('/allmovie')
                }
            })
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">Add Movie</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image URL */}
                <div>
                    <label className="block font-semibold">Movie Poster URL</label>
                    <input
                        type="text"
                        value={formData.imageUrl}
                        name="photo"
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
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
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Genre */}
                <div>
                    <label className="block font-semibold">Genre</label>
                    <select
                        value={formData.genre}
                        name='genre'
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        className="w-full p-2 border rounded"

                    >
                        <option value="">Select Genre</option>
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
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
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                </div>

                {/* Release Year */}
                <div>
                    <label className="block font-semibold">Release Year</label>
                    <select
                        value={formData.releaseYear}
                        name="relesedate"
                        onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    {errors.releaseYear && <p className="text-red-500 text-sm">{errors.releaseYear}</p>}
                </div>

                {/* Rating */}
                <div>
                    <label className="block font-semibold">Rating</label>
                    <input type="number" name="rating" className="w-full p-2 border rounded" />
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
                        value={formData.summary}
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
                    Add Movie
                </button>
            </form>
        </div>
    );
}

export default AddMovie;
