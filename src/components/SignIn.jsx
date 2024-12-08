import React, { useContext, useState } from 'react';
import { IoLogoGoogle } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvide';

const SignIn = () => {
    const { signInUser, setUser, handleGoogleLogin } = useContext(AuthContext);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const newUser = { email, password }
        signInUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                navigate(location?.state ? location.state : '/');
                // console.log(user);
            })
            .catch(err => {
                setError({ ...error, login: err.code })
            })
        // console.log(email, password);
    }
    const handleGoogle = () => {
        handleGoogleLogin()
            .then((result) => {
                navigate('/')
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <button onClick={handleGoogle}>
                            <div className='flex justify-center items-center gap-2 bg-teal-400 p-3 rounded-lg mt-3'>
                                <div>
                                    <IoLogoGoogle className='text-2xl'></IoLogoGoogle>
                                </div>
                                <div>Login With Google</div>
                            </div>
                        </button>
                        <div className='text-center'>
                            <p>New to website? Please <Link to='/signup'><span className='text-red-500'>Register Now!</span></Link></p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default SignIn;