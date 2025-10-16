import React from "react";
import { FormattedMessage } from "react-intl";

function Footer() {
    return (
        <footer className="bg-radial-dark py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-10">
            <div className="flex justify-center text-center">
                <p className="inter text-sm sm:text-base md:text-lg text-acento">
                    DidascaliaDev &copy; {new Date().getFullYear()}. <FormattedMessage id="footer.copy" defaultMessage="Todos los derechos reservados." />
                </p>
            </div>
        </footer>
    );
}

export default Footer;
