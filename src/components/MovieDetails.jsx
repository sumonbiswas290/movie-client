import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MovieDetails = () => {
    const movie = useLoaderData();
    const { _id, photo, genre, title, time, date, summary, rating } = movie;
    const navigate = useNavigate();
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/movie/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deleteCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        navigate('/allmovie')
                    })
            }
        });
    }
    return (
        <div className="card card-side bg-base-100 shadow-xl w-8/12 mx-auto my-10">
            <figure>
                <img className='w-48'
                    src={photo}
                    alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold">{title}</h2>
                <p>Duration Time: {time}</p>
                <p>Publish Year: {date}</p>
                <p>Genere: {genre}</p>
                <p>Rating: {rating}</p>
                <p>Summary: <small>{summary}</small></p>
                <div className="card-actions">
                    <button onClick={() => handleDelete(movie._id)} className="btn btn-primary text-orange-500 font-semibold">Delete</button>
                    <Link to={`/updatemovie/${_id}`}>
                        <button className='btn btn-primary'>Edited</button>
                    </Link>
                    <button className="btn btn-primary">Add to Fevarite</button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;