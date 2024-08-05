import { TSignUpSchema, signUpSchema } from '../utils/types';
import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as  UserAPI from '../network/UserAPI'
import DefaultNavBar from '../components/layout/DefaultNavBar';

export const Signup = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: TSignUpSchema) => {
        try {
            const user = await UserAPI.signUp(data);
            // console.log("Signed up user:", user);
            toast.success("Sign up successful!");
            reset();
            navigate('/login');
        } catch (error: unknown) {
            console.error("Sign up error:", error);
            if (error instanceof Error) {
                toast.error(`Sign up failed: ${error.message}`);
            } else {
                toast.error("An unknown error occurred during sign up");
            }
        }
    };

    useEffect(() => {
        Object.values(errors).forEach((error) => {
            if (error && error.message) {
                toast.error(error.message);
            }
        });
    }, [errors]);

    return (
        <div className="flex flex-col min-h-screen">
            <DefaultNavBar />
            <div className="flex flex-grow justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className=" p-8 rounded-lg mockup-code shadow-md w-full max-w-md">
                    <h2 className="text-2xl mb-4 text-center">Sign up</h2>
                    <div className="mb-4">
                        <input
                            {...register('username')}
                            type="text"
                            placeholder="Username"
                            id="username"
                            name="username"
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
                        Already have an account? <a href="/login" className="text-green-200">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    )
}


