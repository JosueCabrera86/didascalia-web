import React, { createContext, useContext, useState, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { flattenMessages } from '../i18n';
import MensajesEspañol from '../lang/ES-MX.json';
import MensajesEnglish from '../lang/en-US.json';

// Flatten messages
const flatMensajesEs = flattenMessages(MensajesEspañol);
const flatMensajesEn = flattenMessages(MensajesEnglish);

const allMessages = {
    es: flatMensajesEs,
    en: flatMensajesEn,
};


export const LangContext = createContext();


export const useLanguage = () => useContext(LangContext);

export const LangProvider = ({ children }) => {
    const [locale, setLocale] = useState('es');

    const changeLanguage = (newLocale) => {
        if (allMessages[newLocale]) {
            setLocale(newLocale);
        } else {
            console.error(`Error de lenguaje: El idioma '${newLocale}' no está configurado.`);
        }
    };

    const contextValue = useMemo(
        () => ({
            locale,
            changeLanguage,
        }),
        [locale]
    );

    return (
        <LangContext.Provider value={contextValue}>
            <IntlProvider locale={locale} messages={allMessages[locale]} defaultLocale="es">
                {children}
            </IntlProvider>
        </LangContext.Provider>
    );
};
