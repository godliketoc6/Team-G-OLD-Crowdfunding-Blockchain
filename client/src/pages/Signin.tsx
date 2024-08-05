import React, { useEffect } from 'react';
import { signInSchema, TSignInSchema } from '../utils/SignIn';
import DefaultNavBar from '../components/layout/DefaultNavBar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import * as  UserAPI  from '../network/UserAPI'
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
    
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: TSignInSchema) => {
        try {
            const user = await UserAPI.login(data);
            console.log("Login response:", user); // Log the response for debugging
            toast.success("Sign in successful!");
            navigate('/'); 
            reset();
            // Assuming you have a function to set the user in your global state
            // setLoggedInUser(user);
        } catch (error: unknown) {
            console.error("Sign in error:", error);
            if (error instanceof Error) {
                toast.error(`Sign in failed: ${error.message}`);
            } else {
                toast.error("An unknown error occurred during sign in");
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
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 shadow-md w-full max-w-md mockup-code rounded-lg">
                    <h2 className="text-2xl mb-4 text-center">Sign in</h2>
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
                    <button
                        type="submit"
                        className="w-full btn btn-primary text-white py-2 px-4 rounded-md"
                        disabled={isSubmitting}
                    >
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
};
