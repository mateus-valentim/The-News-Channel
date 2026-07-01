"use client";


export default function Navbar() {

    const navlinks = [
        {
            title: "Início",
            id: "inicio",
        },
        {
            title: "Notícias",
            id: "noticias",
        },
        {
            title: "Sobre Nós",
            id: "sobre",
        },
    ];

    return (
        <nav
            className={`
                fixed top-0 left-0 w-full z-50
                transition-all duration-500
                bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm
            `}
        >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 py-5 sm:flex-row sm:justify-between sm:px-6">

                <a
                    href="#"
                    className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-900 sm:justify-start md:text-xl"
                >
                    <span>Mateus_Valentim</span>

                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
                </a>

                <ul className="flex justify-center gap-4 sm:justify-end sm:gap-10 font-mono">
                    {navlinks.map((link, i) => (
                        <li
                            key={link.id}
                            className={`relative text-base  md:text-lg ${link.title === "Notícias" ? 'text-blue-500' : 'text-gray-700'}`}
                        >
                            <a
                                href={`#`}
                                className={`group transition-colors ${link.title != "Notícias" && "hover:text-gray-900"} `}
                            >
                                {link.title}

                                <span
                                    className="absolute left-0 bottom-0 h-0.5 w-full rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-blue-400"
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}