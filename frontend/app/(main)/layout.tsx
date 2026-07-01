
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { SwrProvider } from '@/app/swr-provider';
import { Montserrat, Roboto, Poppins } from 'next/font/google';
import Navbar from "@/app/components/navbar";

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
});

const robotoMono = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
});

const poppins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col">
        <SwrProvider>
            <div className="mb-20 md:mb-15">
                <Navbar></Navbar>
            </div>
            {children}
        </SwrProvider>
        </body>
        </html>
    );
}
