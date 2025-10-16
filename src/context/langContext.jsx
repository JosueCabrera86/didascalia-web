import React, { createContext, useContext, useState, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { flattenMessages } from '../i18n';
import MensajesEspañol from '../lang/ES-MX.json';
import MensajesEnglish from '../lang/en-US.json';


const flatMensajesEn = flattenMessages(MensajesEnglish);
const flatMensajesEs = flattenMessages(MensajesEspañol);


const allMessages = {
    'es': flatMensajesEs,
    'en': flatMensajesEn,
};


export const langContext = createContext();


export const useLanguage = () => useContext(langContext);


export const LangProvider = ({ children }) => {

    const [locale, establecerLocale] = useState('es');


    const establecerLenguaje = (newLocale) => {

        if (allMessages[newLocale]) {
            establecerLocale(newLocale);
        } else {

            console.error(`Error de lenguaje: El idioma '${newLocale}' no está configurado.`);
        }
    };


    const contextValue = useMemo(() => ({
        locale,
        establecerLenguaje,
    }), [locale]);

    return (
        <langContext.Provider value={contextValue}>
            <IntlProvider
                locale={locale}
                messages={allMessages[locale]}
                defaultLocale="es"
            >
                {children}
            </IntlProvider>
        </langContext.Provider>
    );
};