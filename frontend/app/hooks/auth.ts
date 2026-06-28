import useSWR from 'swr'
import axios from '../lib/axios'
import { AxiosError } from 'axios'
import { useEffect, useCallback, Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'

export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    [key: string]: unknown
}

interface ValidationErrorResponse {
    message?: string;
    errors: Record<string, string[]>;
}

export interface UseAuthProps {
    middleware?: 'guest' | 'auth'
    redirectIfAuthenticated?: string
}

type ValidationErrors = Record<string, string[]> | never[] | unknown[]

interface LoginArgs {
    setErrors: Dispatch<SetStateAction<ValidationErrors>>
    setStatus: Dispatch<SetStateAction<string | null>>
    [key: string]: unknown
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthProps = {}) => {
    const router = useRouter()

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const { data: user, error, mutate } = useSWR<User, AxiosError>('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch((error: AxiosError) => {
                throw error;
            })

    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async ({ setErrors, setStatus, ...props }: LoginArgs) => {
        await csrf()

        setErrors([])
        setStatus(null)
        setIsLoggingIn(true)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch((error: AxiosError<ValidationErrorResponse>) => {
                if (error.response?.status !== 422) throw error


                setErrors(error.response.data.errors)
            })
            .finally(() => {
                setIsLoggingIn(false)
            })
    }

    const logout = useCallback(async () => {
        if (!error) {
            await axios
                .post('/logout')
                .then(() => mutate())
                .catch((err: AxiosError) => {
                    if (err.response?.status !== 419 && err.response?.status !== 401) {
                        throw err;
                    }
                });
        }

        window.location.pathname = '/login';
    }, [error, mutate])


    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)

        if (middleware === 'auth' && error) {
            logout().catch((err) => {
                console.error("Failed to safely logout:", err);
            });
        }

    }, [user, error, middleware, redirectIfAuthenticated, router, logout])

    return {
        user,
        login,
        logout,
        isLoading: !user && !error,
        isLoggingIn
    }
}