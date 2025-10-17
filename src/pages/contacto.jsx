import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

function Contacto() {
    const heroVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
    };

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(""); // '', 'success', 'error'
    const recaptchaRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
        if (!formData.email.trim()) newErrors.email = 'El correo es obligatorio';
        if (!formData.asunto.trim()) newErrors.asunto = 'El asunto es obligatorio';
        if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje es obligatorio';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        recaptchaRef.current.execute();
    };

    const onCaptchaChange = (token) => {
        if (!token) {
            setStatus("error");
            return;
        }

        const serviceID = 'service_y6eoolv';
        const templateID = 'template_nrpbjw3';
        const publicKey = 'qL75WhJuzJlzdhXG1';

        const templateParams = {
            from_name: formData.nombre,
            from_email: formData.email,
            subject: formData.asunto,
            message: formData.mensaje,
        };

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then(() => {
                setStatus("success");
                setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
                recaptchaRef.current.reset();
            })
            .catch((error) => {
                console.error('Error al enviar mensaje:', error);
                setStatus("error");
            });
    };

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    return (
        <div className="bg-radial-dark overflow-x-hidden">
            <motion.section
                className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
                initial="hidden"
                animate="visible"
                variants={heroVariants}
            >
                <img
                    src="/imgs/contacto/contacto.jpg"
                    alt="portada"
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-black/40 z-10"></div>

                <div className="relative z-20 text-center px-6 sm:px-12">
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl righteous font-bold text-secundario tracking-wide uppercase drop-shadow-lg"
                    >
                        <FormattedMessage id="contacto.hero" defaultMessage="Contáctanos" />
                    </motion.h1>
                </div>
            </motion.section>

            <div className="relative container mx-auto mt-8 pb-12 px-4 sm:px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start justify-between">

                    {/* Texto */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl righteous font-bold mb-6 text-acento uppercase tracking-wide">
                            <FormattedMessage id="contacto.titulo" defaultMessage="Cuéntame sobre tu proyecto" />
                        </h2>
                        <div className="text-acento rounded-xl inter text-base sm:text-lg leading-relaxed space-y-4 max-w-lg mx-auto lg:mx-0">
                            <p><FormattedMessage id="contacto.parrafo1" defaultMessage="Cada buen sitio web comienza con una buena conversación." /></p>
                            <p><FormattedMessage id="contacto.parrafo2" defaultMessage="Completa el formulario y cuéntanos un poco sobre lo que quieres lograr: tipo de proyecto, objetivos o ideas que ya tengas." /></p>
                            <p><FormattedMessage id="contacto.parrafo3" defaultMessage="Esto nos permite entender mejor tus necesidades y prepararme para ofrecerte una propuesta clara, útil y hecha a tu medida." /></p>
                            <p><FormattedMessage id="contacto.parrafo4" defaultMessage="Trabajamos de forma cercana, transparente y enfocada en resultados que realmente sumen." /></p>
                        </div>
                        <div className="mt-8 text-center lg:text-left">
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSch8kdUoiQhrdpbfgVT0vft7N7VZ-JFjk7qA0OcwPVQpE-C2A/viewform?usp=dialog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-transparent border border-acento/60 text-acento font-semibold px-6 py-3 rounded-md hover:bg-acento/20 hover:scale-105 transition-transform righteous"
                            >
                                <FormattedMessage id="contacto.boton" defaultMessage="Llenar formulario completo" />
                            </a>
                        </div>
                    </div>

                    {/* Formulario */}
                    <form
                        onSubmit={handleSubmit}
                        className="lg:w-1/2 max-w-full sm:max-w-lg mx-auto flex flex-col space-y-4 sm:space-y-5 text-base text-primario bg-[#0b0e18]/40 p-5 sm:p-6 rounded-2xl border border-acento backdrop-blur-sm transition-all duration-300"
                    >
                        {/* Nombre */}
                        <label className="flex flex-col">
                            <span className="text-secundario">
                                <FormattedMessage id="contacto.nombre" defaultMessage="Nombre" />
                            </span>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="border merri border-acento bg-transparent p-2 rounded mt-1 text-primario focus:outline-none focus:ring-2 focus:ring-acento transition"
                            />
                            {errors.nombre && <span className="text-primario text-sm mt-1">{errors.nombre}</span>}
                        </label>

                        {/* Email */}
                        <label className="flex flex-col">
                            <span className="text-secundario">
                                <FormattedMessage id="contacto.email" defaultMessage="E-mail" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border merri border-acento bg-transparent p-2 rounded mt-1 text-primario focus:outline-none focus:ring-2 focus:ring-acento transition"
                            />
                            {errors.email && <span className="text-primario text-sm mt-1">{errors.email}</span>}
                        </label>

                        {/* Asunto */}
                        <label className="flex flex-col">
                            <span className="text-secundario">
                                <FormattedMessage id="contacto.asunto" defaultMessage="Asunto" />
                            </span>
                            <input
                                type="text"
                                name="asunto"
                                value={formData.asunto}
                                onChange={handleChange}
                                className="border merri border-acento bg-transparent p-2 rounded mt-1 text-primario focus:outline-none focus:ring-2 focus:ring-acento transition"
                            />
                            {errors.asunto && <span className="text-primario text-sm mt-1">{errors.asunto}</span>}
                        </label>

                        {/* Mensaje */}
                        <label className="flex flex-col">
                            <span className="text-secundario">
                                <FormattedMessage id="contacto.mens" defaultMessage="Mensaje" />
                            </span>
                            <textarea
                                name="mensaje"
                                value={formData.mensaje}
                                onChange={handleChange}
                                rows={4}
                                className="border merri border-acento bg-transparent p-2 rounded mt-1 resize-y text-primario focus:outline-none focus:ring-2 focus:ring-acento transition"
                            />
                            {errors.mensaje && <span className="text-primario text-sm mt-1">{errors.mensaje}</span>}
                        </label>

                        {/* reCAPTCHA Invisible */}
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LdnMO0rAAAAABwQ24o43hsMsEDgt8Gd10UTzh5N"
                            size="invisible"
                            onChange={onCaptchaChange}
                        />

                        <button
                            type="submit"
                            className="bg-primario merri hover:bg-acento text-acento font-semibold px-6 py-3 rounded-md hover:scale-105 transition-transform"
                        >
                            <FormattedMessage id="contacto.enviar" defaultMessage="Enviar" />
                        </button>

                        {/* Mensajes de estado */}
                        {status === "success" && (
                            <p className="text-green-500 mt-2 text-center font-semibold">
                                Mensaje enviado con éxito
                            </p>
                        )}
                        {status === "error" && (
                            <p className="text-red-500 mt-2 text-center font-semibold">
                                Ocurrió un error, intenta de nuevo
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contacto;
