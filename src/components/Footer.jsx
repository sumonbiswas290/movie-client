import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-neutral text-neutral-content p-10">
                <aside>
                    <h1 className='text-3xl font-bold'><span className='text-red-600'>M</span>ovie<span className='text-red-600'>_</span>Hunter</h1>
                    <p>
                        Movie Hynter Bangladesh
                        <br />
                        Providing reliable tech since 2024
                    </p>
                </aside>
                <nav>
                    <div className="grid grid-flow-row gap-4">
                       <Link to="/">Home</Link>
                       <Link to="/featuremovie">Features Movies</Link>
                       <Link to="/addmovie">Add Movies</Link>
                       <Link to='/allmovie'>All Movies</Link>
                       <Link to='/featuremovie'>Fevirites Movie</Link>
                       <Link to="/about">About</Link>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;