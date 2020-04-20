import React, { useState } from 'react';

// Need initial globalState to successfully build Gatsby bundle (see: https://github.com/gatsbyjs/gatsby/issues/19255)
let defaultState = {
  darkMode: {
    isDarkModeEnabled: false,
    toggleDarkMode: () => {},
  },
};

export const globalStateContext = React.createContext(defaultState);

const GlobalStateContextProvider = (props) => {
  const [isDarkModeEnabled, toggleDarkMode] = useState(defaultState.darkMode.isDarkModeEnabled);

  const globalState = {
    darkMode: {
      isDarkModeEnabled,
      toggleDarkMode: () => toggleDarkMode(!isDarkModeEnabled),
    },
  };

  return <globalStateContext.Provider value={globalState}>{props.children}</globalStateContext.Provider>;
};

export default GlobalStateContextProvider;
