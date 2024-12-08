import React, { useContext, useState } from 'react';
import { IoLogoGoogle } from 'react-icons/io5';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvide';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const SignUp = () => {
    const { createUser, signInUser, setUser,  manageProfile, handleGoogleLogin, updateProfile } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const nevigate = useNavigate();
    const handleSignUp = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;

        if (password.length < 6) {
            setError("Password must be at least 6 character");
            return;
        }

        // sign up korar somoy check korbo speacial carecter ase kina
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{6,}$/.test(password)) {
            setError("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        // const user = {name, email, photo, password}
        // console.log(user);
        createUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user)
                manageProfile({ displayName: name, photoURL: photo })
                    // .then(() => {
                    // }).catch(err => {
                    //     // console.log(err);
                    // })
                    console.log(user);
                    nevigate('/');
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message
                console.log(errorCode, errorMessage);
            })
    }
    const handleGoogle = () => {
        handleGoogleLogin()
            .then((result) => {
                nevigate('/')
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Registration now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="photo url" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-white">Password</span>
                        </label>
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" required />
                        <button onClick={() => setShowPassword(!showPassword)} className='btn btn-xs absolute right-2 top-12'>
                            {
                                showPassword ? <FaEyeSlash /> : <FaEye />
                            }
                        </button>
                    </div>
                    {
                        error && <p className='text-red-500'>{error}</p>
                    }
                        <div className="form-control mt-2">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <button onClick={handleGoogle}>
                            <NavLink className='flex justify-center items-center gap-2 bg-teal-400 p-3 rounded-lg mt-3'>
                                <div>
                                    <IoLogoGoogle className='text-2xl'></IoLogoGoogle>
                                </div>
                                <div>Login With Google</div>
                            </NavLink>
                        </button>
                        <div className='text-center'>
                            <p>Alredy have an account? Please<Link to='/signin'><span className='text-red-500'> Login!</span></Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;