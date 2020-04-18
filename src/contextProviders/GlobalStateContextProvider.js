import React, { useState } from 'react';

export const globalStateContext = React.createContext();

const GlobalStateContextProvider = (props) => {
  const [isDarkModeEnabled, toggleDarkMode] = useState(false);

  const globalState = {
    darkMode: {
      isDarkModeEnabled,
      toggleDarkMode: () => toggleDarkMode(!isDarkModeEnabled),
    },
  };

  return <globalStateContext.Provider value={globalState}>{props.children}</globalStateContext.Provider>;
};

export default GlobalStateContextProvider;
