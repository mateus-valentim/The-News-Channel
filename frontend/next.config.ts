import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com', // Pixabay domain added here
                pathname: '/**', // Allows any image path from this domain
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/**',
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/storage/**",
            },
        ],
    },
};

export default nextConfig;
