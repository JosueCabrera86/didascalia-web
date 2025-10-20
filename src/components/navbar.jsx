import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGlobe } from "react-icons/fa";
import { LangContext } from "../context/LangContext";
import { FormattedMessage } from "react-intl";

function Navbar() {
    const { changeLanguage, locale } = useContext(LangContext);
    const idiomaSiguiente = locale === "es" ? "en" : "es";
    const toggleIdioma = () => changeLanguage(idiomaSiguiente);

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
            className="fixed top-0 left-0 w-full z-50 p-2 text-secundario transition-all duration-300"
        >
            <div className="flex justify-between items-center container mx-auto">
                {/* LOGO */}
                <div>
                    <Link to="/" onClick={() => setIsOpen(false)}>
                        <img
                            src="/imgs/navbar/1.png"
                            alt="logo"
                            className="w-32 h-auto transition-transform duration-500 hover:scale-105 cursor-pointer"
                        />
                    </Link>
                </div>

                {/* NAV DESKTOP */}
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
                                className="hover:text-primario inline-block hover:scale-110 transition-transform duration-500 ease-out"
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

                {/* BOTONES MOBILE */}
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

                    {/* Solo el menú hamburguesa (sin X) */}
                    {!isOpen && (
                        <button
                            className="z-50 text-primario"
                            onClick={() => setIsOpen(true)}
                        >
                            <Menu size={28} />
                        </button>
                    )}
                </div>
            </div>

            {/* OVERLAY oscuro con el menú dentro */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "pointer-events-auto" : "pointer-events-none"
                    }`}
            >
                {/* Fondo semitransparente detrás */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                ></div>

                {/* Panel del menú */}
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: isOpen ? 0 : "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-3 right-3 w-[85%] max-w-sm rounded-2xl bg-black/85 backdrop-blur-md px-6 py-8 shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
                >
                    {/* BOTÓN CERRAR DENTRO */}
                    <div className="flex justify-end mb-4">
                        <button
                            className="text-primario hover:text-white transition"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={26} />
                        </button>
                    </div>

                    {/* LINKS */}
                    <ul className="flex flex-col items-center gap-4 text-primario text-lg font-semibold">
                        {[
                            { to: "/", id: "navbar.home", default: "Inicio" },
                            { to: "/servicios", id: "navbar.servicios", default: "Servicios" },
                            { to: "/contacto", id: "navbar.contacto", default: "Contacto" },
                        ].map((item) => (
                            <motion.li
                                key={item.id}

                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 4px 12px rgba(255,255,255,0.2)",
                                }}
                                className="w-full text-center py-2 px-4 rounded-xl hover:bg-white/10 transition"
                            >
                                <Link
                                    to={item.to}
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full"
                                >
                                    <FormattedMessage id={item.id} defaultMessage={item.default} />
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </motion.nav>
    );
}

export default Navbar;
