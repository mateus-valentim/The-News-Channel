"use client";

import Link from "next/link";

export default function Navbar() {
    const navlinks = [
        {
            title: "Início",
            href: "/",
        },
        {
            title: "Notícias",
            href: "/",
        },
        {
            title: "Sobre Nós",
            href: "#",
        },
    ];

    return (
        <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 py-5 sm:flex-row sm:justify-between sm:px-6">

                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-900 sm:justify-start md:text-xl"
                >
                    <span>Mateus_Valentim</span>

                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500" />
                </Link>

                <ul className="flex justify-center gap-4 font-mono sm:justify-end sm:gap-10">
                    {navlinks.map((link) => (
                        <li
                            key={link.title}
                            className={`relative text-base md:text-lg ${link.title === "Notícias" ? "text-blue-500" : "text-gray-700"}`}
                        >

                                <Link
                                    href={link.href}
                                    className={`group transition-colors ${ link.title !== "Notícias" && "hover:text-gray-900"}`}
                                >
                                    {link.title}

                                    <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-blue-400 transition-transform duration-300 group-hover:scale-x-100" />
                                </Link>

                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}