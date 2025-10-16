import React from "react";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import {
    Globe,
    ShieldCheck,
    Users,
    Search,
    MessageCircle,
    Monitor,
} from "lucide-react";

const PorqueWeb = () => {
    const beneficios = [
        { icon: <Globe className="w-10 h-10 text-cyan-400" />, index: 0 },
        { icon: <ShieldCheck className="w-10 h-10 text-cyan-400" />, index: 1 },
        { icon: <Users className="w-10 h-10 text-cyan-400" />, index: 2 },
        { icon: <Search className="w-10 h-10 text-cyan-400" />, index: 3 },
        { icon: <MessageCircle className="w-10 h-10 text-cyan-400" />, index: 4 },
        { icon: <Monitor className="w-10 h-10 text-cyan-400" />, index: 5 },
    ];

    return (
        <section className="text-acento py-20 px-6 md:px-16 bg-radial-dark">
            <div className="max-w-6xl mx-auto text-center">

                <motion.h2
                    className="text-4xl md:text-4xl righteous mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <FormattedMessage id="porQueWeb.titulo" />
                </motion.h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {beneficios.map((b, i) => (
                        <motion.div
                            key={i}
                            className="bg-zinc-900 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl shadow-black/30 hover:shadow-cyan-500/10 transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="mb-4">{b.icon}</div>
                            <h3 className="text-xl inter font-semibold mb-3 text-cyan-300">
                                <FormattedMessage id={`porQueWeb.beneficios.${b.index}.titulo`} />
                            </h3>
                            <p className="text-acento inter leading-relaxed">
                                <FormattedMessage id={`porQueWeb.beneficios.${b.index}.texto`} />
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    className="mt-16 text-xl text-acento merri italic max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <FormattedMessage id="porQueWeb.mensajeFinal" />
                </motion.p>
            </div>
        </section>
    );
};

export default PorqueWeb;
