'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

export const SwrProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SWRConfig
            value={{
                // Disables the "Postman effect" (refetching on window focus)
                revalidateOnFocus: false,

                // Stops infinite retries when encountering errors like 401 Unauthenticated
                shouldRetryOnError: false,
            }}
        >
            {children}
        </SWRConfig>
    );
};