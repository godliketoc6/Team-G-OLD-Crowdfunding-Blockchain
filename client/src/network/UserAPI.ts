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
    const response = await fetch(input, init);
    if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }
    } else {
        let errorMessage;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.error || `HTTP error! status: ${response.status}`;
        } catch (e) {
            errorMessage = `HTTP error! status: ${response.status}`;
        }
        throw new Error(errorMessage);
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("http://localhost:5000/api/users", { method: "GET" });
    return response.json();
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const url = "http://localhost:5000/api/users/signup"; 
    try {
        const response = await fetchData(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        console.log("Sign up response:", response);
        return response as User;
    } catch (error) {
        console.error("Sign up error:", error);
        throw error;
    }
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const url = "http://localhost:5000/api/users/login"; 
    try {
        const response = await fetchData(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        console.log("Sign up response:", response);
        return response as User;
    } catch (error) {
        console.error("Sign up error:", error);
        throw error;
    }
}

export async function logout() {
    await fetchData("http://localhost:5000/api/users/logout", { method: "POST" });
}