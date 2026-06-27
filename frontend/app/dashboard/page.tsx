'use client';

import { useAuth } from '../hooks/auth';
import LoginPage from "@/app/login/page";

export default function Dashboard() {
    const { user, logout, isLoading } = useAuth({ middleware: 'auth' });

    if (isLoading) return <div>Loading...</div>;
    if(!user) return <LoginPage />;

    return (
        <div className="bg-white w-full h-full">
            <h1>Welcome, {user.name}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}