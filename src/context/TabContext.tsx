import React, { createContext, useContext, useState } from 'react';

// Create a context for managing active tabs
const TabContext = createContext();

// Create a provider component
export const TabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('');

    const value = {
        activeTab,
        setActiveTab,
    };

    return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

// Create a custom hook to use the Tab context
export const useTab = () => {
    return useContext(TabContext);
};
