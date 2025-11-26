import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import PorqueWeb from "../components/porqueweb";
import Portafolio from "../components/portafolio";
import HeroContacto from "../components/herocontacto";

const Home = () => {
  const heroVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden text-white">
      <motion.section
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <img
          src="/imgs/inicio/portada.png"
          alt="Portada"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute bottom-0 left-0 w-full h-32 sm:h-48 bg-gradient-to-t from-black to-transparent"></div>

        <div className="relative z-10 text-center px-4 sm:px-8 md:px-16">
          <motion.h1
            className="text-center text-4xl sm:text-5xl md:text-8xl righteous font-bold mb-4 sm:mb-6 text-primario tracking-wide uppercase drop-shadow-lg"
            variants={heroVariants}
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <FormattedMessage
                id="home.titulo"
                defaultMessage="DidascaliaDev"
              />
            </motion.span>
            <br />
            <motion.span
              className="text-3xl md:text-6xl font-light text-secundario"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: 0.2 }}
            >
              <FormattedMessage
                id="home.subt"
                defaultMessage="Desarrollo Web"
              />
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-2xl italic sm:text-3xl md:text-4xl text-secundario inter font-bold tracking-wide drop-shadow-md"
            variants={heroVariants}
          >
            <FormattedMessage
              id="home.sub"
              defaultMessage="Tus ideas: una nueva historia digital"
            />
          </motion.p>
        </div>
      </motion.section>

      <section className="relative w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden mt-10 md:mt-10">
        <div className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-12 md:py-0 text-center md:text-left z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl inter font-bold mb-4 sm:mb-6 text-acento tracking-wide uppercase drop-shadow-lg">
            <FormattedMessage
              id="home.servicios"
              defaultMessage="Consigue el impulso digital que tu proyecto necesita"
            />
          </h1>
          <p className="text-xl sm:text-3xl md:text-4xl text-secundario inter font-bold tracking-wide drop-shadow-md">
            <FormattedMessage
              id="home.sersub"
              defaultMessage="Diseño y desarrollo a la medida, seguro y eficaz"
            />
          </p>
          <Link
            to="/servicios"
            className="block text-center border rounded-xl mt-6 text-lg sm:text-xl inter font-bold bg-radial-dark text-acento mx-2 py-2 px-4 transition duration-300 transform hover:scale-105"
          >
            <FormattedMessage id="home.buttons" defaultMessage="Servicios" />
          </Link>
        </div>

        <div className="relative w-full md:h-[500px]">
          <img
            src="/imgs/inicio/1.jpg"
            alt="Diseño web"
            className="w-full h-auto md:h-full object-cover md:rounded-l-[0px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
      </section>

      <PorqueWeb />
      <Portafolio />
      <HeroContacto />
    </div>
  );
};

export default Home;
