import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { BsWhatsapp, BsEnvelope } from "react-icons/bs";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const HeroContacto = () => {
  const [hoveredCircle, setHoveredCircle] = useState(false);
  const [pauseOrbit, setPauseOrbit] = useState(false);

  const icons = [
    { icon: <BsWhatsapp size={20} />, initialAngle: 0, href: "https://wa.me/525551886713" },
    { icon: <BsEnvelope size={20} />, initialAngle: 180, href: "/contacto" },
  ];

  const getRadius = () => {
    if (window.innerWidth < 640) return 60;
    if (window.innerWidth < 1024) return 90;
    return 110;
  };

  const orbitDuration = 50;

  return (
    <motion.section
      className="relative py-16 sm:py-20 md:py-24 grid grid-cols-1 md:grid-cols-2 items-center justify-center px-4 sm:px-10 md:px-20 bg-radial-dark overflow-visible"
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {/* Texto */}
      <div className="flex flex-col justify-center items-center text-center z-10 px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl inter font-bold mb-6 text-acento tracking-wide uppercase drop-shadow-lg">
          <FormattedMessage
            id="home.agenda"
            defaultMessage="No lo dudes más, agenda una reunión y empecemos con tu proyecto"
          />
        </h1>
      </div>

      {/* Círculo con iconos */}
      <div className="flex justify-center items-center relative mt-10 md:mt-0">
        <motion.div
          className="relative rounded-full bg-cyan-600/20 flex items-center justify-center cursor-pointer shadow-lg"
          style={{
            width: window.innerWidth < 640 ? 80 : window.innerWidth < 1024 ? 120 : 140,
            height: window.innerWidth < 640 ? 80 : window.innerWidth < 1024 ? 120 : 140,
          }}
          variants={{
            rest: { opacity: 0.95, scale: 0.95 },
            hover: { scale: 1 },
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          onMouseEnter={() => setHoveredCircle(true)}
          onMouseLeave={() => {
            setHoveredCircle(false);
            setPauseOrbit(false);
          }}
        >
          <motion.div
            className="absolute w-full h-full rounded-full bg-primario"
            variants={{
              rest: { scale: 1, opacity: 0.28 },
              hover: { scale: 1.15, opacity: 0.55 },
            }}
            transition={{ duration: 0.35 }}
          />

          <span className="relative z-10 text-center text-acento inter font-semibold text-sm sm:text-base md:text-lg pointer-events-none">
            <FormattedMessage id="home.button" defaultMessage="Contáctanos" />
          </span>

          {icons.map((item, i) => {
            const controls = useAnimation();

            if (hoveredCircle && !pauseOrbit) {
              controls.start({
                rotate: [item.initialAngle, item.initialAngle + 360],
                transition: { repeat: Infinity, ease: "linear", duration: orbitDuration },
              });
            } else {
              controls.stop();
            }

            const isExternal = item.href.startsWith("http");

            return (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={controls}
                initial={{ rotate: item.initialAngle }}
              >
                <motion.div
                  initial={{ x: 0, scale: 0, opacity: 0 }}
                  animate={
                    hoveredCircle
                      ? { x: getRadius(), scale: 1, opacity: 1 }
                      : { x: 0, scale: 0, opacity: 0 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.8,
                    delay: i * 0.1,
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secundario text-primario flex items-center justify-center shadow-md z-30"
                  onMouseEnter={() => setPauseOrbit(true)}
                  onMouseLeave={() => setPauseOrbit(false)}
                >
                  {isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full h-full"
                    >
                      {item.icon}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex items-center justify-center w-full h-full"
                    >
                      {item.icon}
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroContacto;
