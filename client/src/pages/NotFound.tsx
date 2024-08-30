import React from 'react';
import { Link } from 'react-router-dom';
import image from '../image/404.png'

const NotFound = () => {
    return (
        <div className="min-h-screen     flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="text-center">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-800">404</h1>
                        <p className="text-2xl font-semibold text-gray-600 mt-4">Oops! Page not found</p>
                        <p className="text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
                    </div>
                    <div className="mt-8">
                        <img src={image} alt="Page not found" className="h-auto object-contain" />
                    </div>
                    <div className="mt-8 text-center">
                        <Link
                            to="/"
                            className="btn btn-neutral btn-lg hover:btn-ghost transition-colors duration-300"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;