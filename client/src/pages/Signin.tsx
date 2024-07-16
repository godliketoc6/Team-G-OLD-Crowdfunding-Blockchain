import React, { useEffect } from 'react'

export const Signin = () => {
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <form className="p-8 shadow-md w-full max-w-md mockup-code rounded-lg">
                <h2 className="text-2xl mb-4 text-center">Sign in</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        className="input input-bordered w-full max-w-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        className="input input-bordered w-full max-w-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full btn btn-primary text-white py-2 px-4 rounded-md"
                >
                    SIGN IN
                </button>
            </form>
        </div>
    )
}
