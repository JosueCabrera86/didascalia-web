import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaPalette, FaGlobe, FaShoppingCart, FaCog, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import FAQ from "../components/faqs";

const Servicios = () => {
    const heroVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
    };

    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 200], [1, 0]);
    const y = useTransform(scrollY, [0, 200], [0, -100]);

    const servicios = [
        { icon: <FaGlobe size={28} />, title: <FormattedMessage id="servicios.cards.items.0.titulo" />, description: <FormattedMessage id="servicios.cards.items.0.descripcion" /> },
        { icon: <FaShoppingCart size={28} />, title: <FormattedMessage id="servicios.cards.items.1.titulo" />, description: <FormattedMessage id="servicios.cards.items.1.descripcion" /> },
        { icon: <FaCog size={28} />, title: <FormattedMessage id="servicios.cards.items.2.titulo" />, description: <FormattedMessage id="servicios.cards.items.2.descripcion" /> },
        { icon: <FaPalette size={28} />, title: <FormattedMessage id="servicios.cards.items.3.titulo" />, description: <FormattedMessage id="servicios.cards.items.3.descripcion" /> },
    ];

    const pasos = ["servicios.proceso.pasos.0", "servicios.proceso.pasos.1", "servicios.proceso.pasos.2", "servicios.proceso.pasos.3"];

    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.body.offsetHeight;
            setShowButtons(scrollTop + windowHeight >= docHeight - 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full min-h-screen overflow-x-hidden bg-black relative">

            {/* HERO */}
            <motion.section
                className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
                initial="hidden"
                animate="visible"
                variants={heroVariants}
            >
                {/* 🔧 Ajuste principal: absolute en móvil, fixed en escritorio */}
                <motion.img
                    src="/imgs/servicios/portada.png"
                    alt="Decoración"
                    style={{ opacity, y }}
                    transition={{ duration: 1 }}
                    className="absolute sm:fixed inset-0 w-full h-screen object-cover z-[1]"
                />

                <div className="absolute inset-0 bg-black/40 z-[3]"></div>
                <div className="relative z-10 text-center px-4 sm:px-8 md:px-16">
                    <motion.h1
                        className="text-6xl sm:text-4xl md:text-6xl righteous font-bold mb-6 text-secundario tracking-wide uppercase drop-shadow-lg"
                    >
                        <FormattedMessage id="servicios.hero.titulo" />
                    </motion.h1>
                </div>
            </motion.section>

            {/* CARDS */}
            <section className="bg-radial-dark text-acento py-20 px-5 sm:px-6 md:px-10" id="servicios">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <motion.h2
                        className="text-3xl sm:text-3xl md:text-4xl righteous text-acento font-bold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <FormattedMessage id="servicios.cards.titulo" />
                    </motion.h2>
                    <motion.p
                        className="text-acento inter text-base sm:text-lg md:text-2xl max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <FormattedMessage id="servicios.cards.descripcion" />
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-8 max-w-7xl mx-auto">
                    {servicios.map((servicio, index) => (
                        <motion.div
                            key={index}
                            className="bg-zinc-900 p-4 sm:p-5 rounded-2xl shadow-lg shadow-cyan-500 hover:shadow-2xl transition-shadow cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="text-2xl mb-2 text-cyan-500 flex justify-center">{servicio.icon}</div>
                            <h3 className="text-lg inter text-center text-cyan-500 font-semibold mb-2">
                                {servicio.title}
                            </h3>
                            <p className="text-acento merri text-center text-sm sm:text-base md:text-base">
                                {servicio.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* PROCESO */}
            <div className="bg-radial-dark py-20">
                <div className="container mx-auto px-5 sm:px-6 md:px-10 flex flex-col md:flex-row items-start gap-6 md:gap-12">
                    <motion.div
                        className="md:w-1/2 relative flex-shrink-0"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.img
                            src="imgs/servicios/responsive.jpg"
                            alt="Cómo consigo mi web"
                            className="w-full h-auto rounded-lg shadow-md relative z-10"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 rounded-lg bg-black/20 z-20 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg z-30 pointer-events-none"></div>
                    </motion.div>

                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-3xl righteous font-bold text-acento mb-4">
                            <FormattedMessage id="servicios.proceso.titulo" />
                        </h1>
                        <h2 className="text-xl inter text-acento mb-8">
                            <FormattedMessage id="servicios.proceso.subtitulo" />
                        </h2>
                        <ul className="space-y-6">
                            {pasos.map((id, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <motion.span
                                        className="text-xl md:text-4xl righteous font-bold text-primario flex-shrink-0 mr-6"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        {index + 1}
                                    </motion.span>
                                    <div className="relative flex-1 pl-6">
                                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-secundario"></span>
                                        <p className="text-acento merri text-lg leading-relaxed relative">
                                            <FormattedMessage id={id} />
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* FAQ */}
            <div className="relative z-[10]">
                <FAQ />
            </div>

            {/* BOTONES FLOTANTES */}
            <div className="relative">
                {showButtons && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed bottom-18 left-1/2 transform -translate-x-1/2 flex sm:bottom-30 sm:flex-row gap-4 z-[50]"
                    >
                        <a
                            href="https://wa.me/525551886713"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-secundario w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                        >
                            <FaWhatsapp size={22} className="text-primario" />
                        </a>
                        <a
                            href="/contacto"
                            className="bg-secundario w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                        >
                            <FaEnvelope size={22} className="text-primario" />
                        </a>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Servicios;
