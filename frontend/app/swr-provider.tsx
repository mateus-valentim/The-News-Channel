'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

export const SwrProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SWRConfig
            value={{
                revalidateOnFocus: false,
                shouldRetryOnError: false,
            }}
        >
            {children}
        </SWRConfig>
    );
};