import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGlobe } from "react-icons/fa";
import { langContext } from "../context/langcontext";
import { FormattedMessage } from "react-intl";

function Navbar() {
    const { establecerLenguaje, locale } = useContext(langContext);
    const idiomaSiguiente = locale === "es" ? "en" : "es";
    const toggleIdioma = () => establecerLenguaje(idiomaSiguiente);

    const [isOpen, setIsOpen] = useState(false);


    const { scrollY } = useScroll();


    const backgroundOpacity = useTransform(scrollY, [0, 200], [0.1, 0.85]);
    const blur = useTransform(scrollY, [0, 200], ["blur(2px)", "blur(10px)"]);
    const shadowOpacity = useTransform(scrollY, [0, 200], [0, 0.4]);

    return (
        <motion.nav
            style={{
                backgroundColor: backgroundOpacity,
                backdropFilter: blur,
                boxShadow: shadowOpacity,
            }}
            className="fixed top-0 left-0 w-full z-50 p-2 text-secundario  transition-all duration-300"
        >
            <div className="flex justify-between items-center container mx-auto">

                <div>
                    <img
                        src="/imgs/navbar/logo.png"
                        alt="logo"
                        className="w-26 h-auto transition-transform duration-500 hover:scale-105"
                    />
                </div>


                <div className="hidden lg:flex flex-col items-center">
                    <ul className="flex gap-6 items-center inter font-bold text-xl mb-2">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-primario inline-block hover:scale-110 transition-transform duration-500 ease-out"
                            >
                                <FormattedMessage id="navbar.home" defaultMessage="Inicio" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/servicios"
                                className="hover:primario inline-block hover:scale-110 transition-transform duration-500 ease-out"
                            >
                                <FormattedMessage id="navbar.servicios" defaultMessage="Servicios" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contacto"
                                className="hover:text-primario inline-block hover:scale-110 transition-transform duration-500 ease-out"
                            >
                                <FormattedMessage id="navbar.contacto" defaultMessage="Contacto" />
                            </Link>
                        </li>
                    </ul>

                    <button
                        onClick={toggleIdioma}
                        className="flex items-center ml-auto gap-2 px-1 merri text-sm text-secundario border border-secundario rounded-lg hover:bg-secundario/20 transition"
                    >
                        <FaGlobe className="text-secundario" />
                        <span className="uppercase tracking-wide">
                            <span className={locale === "es" ? "font-bold" : ""}>es</span> |
                            <span className={locale === "en" ? "font-bold" : ""}>en</span>
                        </span>
                    </button>
                </div>


                <div className="flex items-center gap-3 lg:hidden">

                    <button
                        onClick={toggleIdioma}
                        className="flex items-center gap-1 px-2 py-1 text-sm text-primario border border-secundario rounded hover:bg-secundario/20 transition"
                    >
                        <FaGlobe className="text-primario" />
                        <span className="uppercase tracking-wide">
                            <span className={locale === "es" ? "font-bold" : ""}>es</span> |
                            <span className={locale === "en" ? "font-bold" : ""}>en</span>
                        </span>
                    </button>


                    <button
                        className="z-50 text-primario"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>


            <div
                className={`fixed top-0 right-0 h-screen w-2/3 bg-black/90 backdrop-blur-lg 
                shadow-[0_0_15px_rgba(0,0,0,0.8)] 
                transform transition-transform duration-300 ease-in-out z-40
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <ul className="flex flex-col items-center gap-6 mt-20 text-primario">
                    <li>
                        <Link
                            to="/"
                            className="hover:text-sky-400 hover:scale-110 inline-block transition-transform duration-300 ease-out"
                            onClick={() => setIsOpen(false)}
                        >
                            <FormattedMessage id="navbar.home" defaultMessage="Inicio" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/servicios"
                            className="hover:text-sky-400 hover:scale-110 inline-block transition-transform duration-300 ease-out"
                            onClick={() => setIsOpen(false)}
                        >
                            <FormattedMessage id="navbar.servicios" defaultMessage="Servicios" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contacto"
                            className="hover:text-sky-400 hover:scale-110 inline-block transition-transform duration-300 ease-out"
                            onClick={() => setIsOpen(false)}
                        >
                            <FormattedMessage id="navbar.contacto" defaultMessage="Contacto" />
                        </Link>
                    </li>
                </ul>
            </div>
        </motion.nav>
    );
}

export default Navbar;
