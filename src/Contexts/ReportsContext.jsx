import { createContext, useContext } from 'react';

const ReportsContext = createContext(null);

const ReportsContextProvider = ({ value, children }) => {
    return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
};

const useReportsContext = () => {
    const context = useContext(ReportsContext);

    if (!context) {
        throw new Error('useReportsContext must be used in a ReportsContextProvider with a non falsy value)');
    }

    return context;
};
export default ReportsContext;
export { ReportsContextProvider, useReportsContext };
