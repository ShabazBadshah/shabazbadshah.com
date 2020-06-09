/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const IS_DARK_MODE_ENABLED_LOCAL_STORAGE_KEY = 'isDarkModeEnabled';
const IS_DARK_MODE_ENABLED_DEFAULT = false;

// Default state required for Gatsby build to run successfully
export const globalStateContext = React.createContext({
  darkMode: {
    isDarkModeEnabled: IS_DARK_MODE_ENABLED_DEFAULT,
  },
});

const GlobalStateContextProvider = (props) => {
  const [isDarkModeEnabled, __toggleDarkMode] = useState(
    JSON.parse(IS_DARK_MODE_ENABLED_DEFAULT || localStorage.getItem(IS_DARK_MODE_ENABLED_LOCAL_STORAGE_KEY))
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
