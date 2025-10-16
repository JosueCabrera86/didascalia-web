import React, { useState, useContext, memo } from "react";
import { BsChevronDown } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { LangContext } from "../context/LangContext";
import { FormattedMessage } from "react-intl";

const FAQItem = memo(({ index, active, onToggle }) => {
    const faqId = `servicios.faq.preguntas.${index}`;

    return (
        <motion.div
            layout
            className="bg-gradient-to-r from-zinc-900/90 to-zinc-800/70 
                       rounded-2xl shadow-md hover:shadow-lg hover:shadow-cyan-400/25 
                       transition-all duration-300 
                       max-w-3xl mx-auto
                       py-2 sm:py-3"
        >
            <motion.button
                className="w-full flex items-center justify-between px-4 sm:px-5 text-left inter text-secundario font-semibold focus:outline-none"
                onClick={() => onToggle(index)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl righteous text-primario">{index + 1}</span>
                    <span className="text-base sm:text-lg md:text-lg">
                        <FormattedMessage id={`${faqId}.pregunta`} />
                    </span>
                </div>
                <motion.span
                    animate={{ rotate: active ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <BsChevronDown size={22} />
                </motion.span>
            </motion.button>

            <AnimatePresence initial={false}>
                {active && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden px-4 sm:px-5 pb-3 sm:pb-4 text-gray-400 inter text-sm sm:text-base md:text-base"
                    >
                        <FormattedMessage id={`${faqId}.respuesta`} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const { locale } = useContext(LangContext);
    const totalFaqs = 10;

    const toggle = (index) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="bg-radial-dark text-acento py-12 sm:py-16 md:py-18 lg:py-20 px-4 sm:px-5 md:px-10">
            <div className="container mx-auto max-w-3xl text-center mb-8 sm:mb-10 md:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-4xl righteous font-bold mb-3 sm:mb-4">
                    <FormattedMessage id="servicios.faq.titulo" defaultMessage="Preguntas Frecuentes" />
                </h2>
                <p className="text-acento inter text-sm sm:text-base md:text-lg">
                    <FormattedMessage
                        id="servicios.faq.subtitulo"
                        defaultMessage="Resolvemos las dudas más comunes de nuestros clientes."
                    />
                </p>
            </div>

            <motion.div
                className="space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {[...Array(totalFaqs)].map((_, index) => (
                    <motion.div key={`faq-${index}`} variants={itemVariants}>
                        <FAQItem
                            index={index}
                            active={activeIndex === index}
                            onToggle={toggle}
                        />
                    </motion.div>
                ))}
            </motion.div>

            <div className="mt-6 sm:mt-8 md:mt-10 text-center text-acento merri italic text-base sm:text-lg md:text-xl">
                <FormattedMessage
                    id="servicios.faq.contacto"
                    defaultMessage="Si aún tienes dudas, contáctanos."
                />
            </div>
        </section>
    );
};

export default FAQ;
