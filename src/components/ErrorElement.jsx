import React from 'react';
import ErrorPhoto from '../assets/error.jpeg';

const ErrorElement = () => {
    return (
        <div>
            <div className='flex justify-center items-center gap-5'>
                <div className='items-center text-center gap-5'>
                    <img src={ErrorPhoto} alt="Error Photo" />
                    <h1 className='text-xl font-bold'>Page not Found</h1>
                </div>

            </div>
            <p className='text-center'>Error: 404</p>
        </div>
    );
};

export default ErrorElement;