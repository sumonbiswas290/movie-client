import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvide';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    }
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to='/featuremovie'>Featues Movie</NavLink></li>
        <li><NavLink to='/addmovie'>Add Movie</NavLink></li>
        <li><NavLink to='/allmovie'>All Movie</NavLink></li>
        <li><NavLink to='/myfavorites'>My Favorites</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
    </>
    return (
        <div className='bg-teal-300'>
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-4">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl font-bold gap-0"><span className='text-red-600'>M</span><span className=''>ovies <span className='font-extrabold text-red-600 gap-0'>_</span> Hunte</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links}
                    </ul>
                </div>
                <div className="theme-toggle flex lg:ml-24">
                    <header className={`header flex gap-2 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
                        <button
                            onClick={toggleTheme}
                            className={`toggle-button px-4 py-2 rounded ${isDarkMode
                                    ? "bg-yellow-400 text-black hover:bg-yellow-500"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                }`}
                        >
                        {isDarkMode ? "Light" : "Dark"}
                        </button>
                    </header>
                </div>
                
                <div className='space-x-2 navbar-end'>
                
                    <div className='gap-3 mr-8'>
                        {
                            user && user?.email ? <div className='w-16 rounded-full flex items-center gap-2'>
                                <p className='font-semibold'>{user?.displayName}</p>
                                <img className='rounded-full h- w-12' src={user?.photoURL} alt="" />
                            </div> : ''
                        }
                    </div>
                    <div className='gap-3'>
                        {
                            user && user?.email ? <button onClick={signOutUser} className='btn btn-neutral rounded-none'>LogOut</button> : <Link to='/signin' className='btn btn-neutral rounded-none'>Login</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;