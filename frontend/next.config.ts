import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com', // Pixabay domain added here
                pathname: '/**', // Allows any image path from this domain
            },
            // You can also keep your local backend domain here for when users upload real photos
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
