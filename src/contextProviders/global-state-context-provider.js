import React, { useState, useEffect } from 'react';

export const globalStateContext = React.createContext();

const GlobalStateContextProvider = (props) => {
  const IS_DARK_MODE_ENABLED_LOCAL_STORAGE_KEY = 'isDarkModeEnabled';

  const [isDarkModeEnabled, __toggleDarkMode] = useState(
    JSON.parse(true || localStorage.getItem(IS_DARK_MODE_ENABLED_LOCAL_STORAGE_KEY))
  );

  const globalState = {
    darkMode: {
      isDarkModeEnabled,
      toggleDarkMode: () => {
        // Save site dark mode state to local storage synchronously and return updated state
        localStorage.setItem(
          IS_DARK_MODE_ENABLED_LOCAL_STORAGE_KEY,
          JSON.stringify(!isDarkModeEnabled),
          __toggleDarkMode(!isDarkModeEnabled)
        );
        return !isDarkModeEnabled;
      },
    },
  };

  return <globalStateContext.Provider value={globalState}>{props.children}</globalStateContext.Provider>;
};

export default GlobalStateContextProvider;
