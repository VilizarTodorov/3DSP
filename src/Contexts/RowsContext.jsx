import { createContext, useContext } from 'react';

const RowsContext = createContext(null);

const RowsContextProvider = ({ value, children }) => {
    return <RowsContext.Provider value={value}>{children}</RowsContext.Provider>;
};

const useRowsContext = () => {
    const context = useContext(RowsContext);

    if (!context) {
        throw new Error('useRowsContext must be used in a RowsContextProvider with a non falsy value');
    }

    return context;
};
export default RowsContext;
export { RowsContextProvider, useRowsContext };
