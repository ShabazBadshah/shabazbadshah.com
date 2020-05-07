/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const globalStateContext = React.createContext();

const GlobalStateContextProvider = (props) => {
  const IS_DARK_MODE_ENABLED_LOCAL_STORAGE_KEY = 'isDarkModeEnabled';
  const IS_DARK_MODE_ENABLED_DEFAULT = false;

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
