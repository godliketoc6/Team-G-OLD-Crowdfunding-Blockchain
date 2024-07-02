import { TSignUpSchema, signUpSchema } from '../utils/types';
import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

export const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: TSignUpSchema) => {
        // TODO: submit to server
        // ...
        await new Promise((resolve) => setTimeout(resolve, 1000));

        reset();
    };
    
    useEffect(() => {
        Object.values(errors).forEach((error) => {
            if (error && error.message) {
                toast.error(error.message);
            }
        });
    }, [errors]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4 text-center">Sign up</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        {...register('name')}
                        type="name"
                        id="name"
                        name="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        {...register('email')}
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        {...register('password')}
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                    SIGN UP
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <a href="#" className="text-blue-600">Sign in</a>
                </p>
            </form>
        </div>
    )
}


