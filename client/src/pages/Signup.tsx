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
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className=" p-8 rounded-lg mockup-code shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4 text-center">Sign up</h2>
                <div className="mb-4">
                    <input
                        {...register('name')}
                        type="name"
                        placeholder="Name"
                        id="name"
                        name="name"
                        className="input input-bordered w-full max-w-md"
                    />
                </div>
                <div className="mb-4">
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        className="input input-bordered w-full max-w-md"
                    />
                </div>
                <div className="mb-4">
                    <input
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        className="input input-bordered w-full max-w-md"
                    />
                </div>
                <div className="mb-4">
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="input input-bordered w-full max-w-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full btn btn-primary text-white py-2 px-4 rounded-md"
                >
                    SIGN UP
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <a href="#" className="text-green-200">Sign in</a>
                </p>
            </form>
        </div>
    )
}


