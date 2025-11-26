import React from "react";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";

const Portafolio = () => {
  const intl = useIntl();

  const proyectos = [
    {
      logo: "/imgs/portafolio/alla.png",
      url: "https://losdealla.com",
      alt: "Los de Allá",
    },
    { logo: "/imgs/portafolio/13.png", url: "#", alt: "Proyecto 13" },
    {
      logo: "/imgs/portafolio/mexikool.png",
      url: "https://mexikooltours.com",
      alt: "Mexikool",
    },
    { logo: "/imgs/portafolio/mano1.png", url: "#", alt: "Proyecto Mano" },
    {
      logo: "/imgs/portafolio/rb.png",
      url: "https://ampliaconsciencia.com",
      alt: "Amplia Conciencia",
    },
  ];

  const testimonios = [
    { id: 1 },
    { id: 2 },
    { id: 3 } /*{ id: 4 }, { id: 5 }*/,
  ];
  const url = [];
  const marquee = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 100,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="text-acento bg-radial-dark overflow-hidden">
      <div className="py-20 px-8 md:px-16">
        {/* Título */}
        <motion.h2
          className="text-4xl righteous mb-10 text-acento text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FormattedMessage
            id="portafolio.titulo"
            defaultMessage="Lo que dicen nuestros clientes"
          />
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonios.map((t, i) => {
            const imgSrc = intl.formatMessage({
              id: `portafolio.testimonio${t.id}.imagen`,
            });
            return (
              <motion.div
                key={i}
                className="relative p-6 rounded-2xl overflow-hidden shadow-md transition-all duration-300 group bg-zinc-900/50 text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/70 to-zinc-950/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col space-y-4">
                  <p className="text-acento italic text-justify leading-relaxed mb-2">
                    “
                    <FormattedMessage
                      id={`portafolio.testimonio${t.id}.comentario`}
                    />
                    ”
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={imgSrc}
                      alt={`Foto de ${intl.formatMessage({
                        id: `portafolio.testimonio${t.id}.nombre`,
                      })}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-cyan-300 shadow-md"
                    />
                    <div className="flex flex-col">
                      <h4 className="text-primario inter font-semibold">
                        <FormattedMessage
                          id={`portafolio.testimonio${t.id}.nombre`}
                        />
                      </h4>
                      <p className="text-secundario merri text-sm">
                        <FormattedMessage
                          id={`portafolio.testimonio${t.id}.empresa`}
                        />
                      </p>
                      <p className="text-secundario merri text-sm">
                        <p className="text-secundario merri text-sm underline">
                          <a
                            href={intl.formatMessage({
                              id: `portafolio.testimonio${t.id}.url`,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-300 hover:text-cyan-400"
                          >
                            <FormattedMessage
                              id={`portafolio.testimonio${t.id}.url`}
                            />
                          </a>
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="w-full bg-black overflow-hidden py-10">
        <motion.div
          className="flex gap-10 w-max min-w-full px-8 md:px-16"
          variants={marquee}
          animate="animate"
        >
          {[...proyectos, ...proyectos].map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer">
              <motion.img
                src={p.logo}
                alt={p.alt}
                className="w-28 h-28 object-contain transition-transform duration-300"
                whileHover={{ scale: 1.2 }}
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portafolio;
