import { User } from '../models/User';

export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginCredentials {
    email: string,
    password: string,
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, {
        ...init,
        credentials: 'include', // Ensures cookies (like session cookies) are included in the request
    });
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}


export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("http://localhost:5000/api/users", { method: "GET" });
    return response.json();
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("http://localhost:5000/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("http://localhost:5000/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function logout() {
    await fetchData("http://localhost:5000/api/users/logout", { method: "POST" });
}