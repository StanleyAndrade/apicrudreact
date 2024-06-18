import React, { createContext, useState } from 'react';
import Account from '../userStore/account';

export const ComponenteContext = createContext();

export const ComponenteProvider = ({ children }) => {
    const [componente, setComponente] = useState(<Account />);

    return (
        <ComponenteContext.Provider value={{ componente, setComponente }}>
            {children}
        </ComponenteContext.Provider>
    );
};
