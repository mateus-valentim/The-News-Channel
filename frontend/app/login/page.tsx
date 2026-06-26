'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/auth';
import { useSearchParams } from 'next/navigation';

type ValidationErrors = Record<string, string[]> | never[] | unknown[];

export default function LoginPage() {
    const searchParams = useSearchParams();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRemember, setShouldRemember] = useState(false);

    const [errors, setErrors] = useState<ValidationErrors>([]);
    const [status, setStatus] = useState<string | null>(null);

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });



    const submitForm = async (event: FormEvent) => {
        event.preventDefault();

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                        />

                        {!Array.isArray(errors) && errors.email && (
                            <p className="mt-2 text-sm text-red-600">{errors.email[0]}</p>
                        )}
                    </div>


                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        {!Array.isArray(errors) && errors.password && (
                            <p className="mt-2 text-sm text-red-600">{errors.password[0]}</p>
                        )}
                    </div>


                    <div className="mt-4 block">
                        <label htmlFor="remember_me" className="inline-flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                checked={shouldRemember}
                                onChange={(e) => setShouldRemember(e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>

                    <div className="mt-4 flex items-center justify-end">


                        <button
                            type="submit"
                            className="ml-4 inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}