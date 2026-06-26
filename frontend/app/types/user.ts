import React from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;

}

export interface FormErrors {
    [key: string]: string[];
}

export interface AuthMiddlewareProps {
    middleware?: 'auth' | 'guest';
    redirectIfAuthenticated?: string;
}

export interface LoginArgs {
    email: string;
    password: string;
    remember?: boolean;
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
    setStatus: React.Dispatch<React.SetStateAction<string | null>>;
}