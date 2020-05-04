import { Link } from 'gatsby';
import React, { Component, useContext } from 'react';
import styled from 'styled-components';

import { deviceMaxWidth } from '../../../static/media-query-sizes.js';

import { globalThemeColour } from '../../assets/global-style-constants.js';
import { globalStateContext } from '../../contextProviders/global-state-context-provider.js';

const DarkModeSwitchButton = () => {
  return (
    <globalStateContext.Consumer>
      {(globalState) => (
        <React.Fragment>
          {globalState.darkMode.isDarkModeEnabled ? (
            <DarkModeSwitchButtonContainer
              // Sun icon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 41 41"
              width="40"
              height="40"
              onClick={() => globalState.darkMode.toggleDarkMode()}
              style={{ transform: 'rotate(259deg)' }}
            >
              <g transform="translate(-32 -197)">
                <circle cx="20" cy="20" r="20" transform="translate(32 197)" fill={globalThemeColour} />
                <path
                  d="M13,8.125A4.875,4.875,0,1,0,17.876,13,4.883,4.883,0,0,0,13,8.125Zm12.513,4.088L20.7,9.811l1.7-5.1A.878.878,0,0,0,21.294,3.6l-5.1,1.7L13.788.488a.879.879,0,0,0-1.574,0L9.811,5.3l-5.1-1.7A.878.878,0,0,0,3.6,4.708l1.7,5.1L.488,12.213a.879.879,0,0,0,0,1.574L5.3,16.19l-1.7,5.1a.878.878,0,0,0,1.112,1.112l5.1-1.7,2.4,4.809a.879.879,0,0,0,1.574,0l2.4-4.809,5.1,1.7A.878.878,0,0,0,22.4,21.294l-1.7-5.1,4.809-2.4a.88.88,0,0,0,.01-1.579ZM17.6,17.6a6.5,6.5,0,1,1,0-9.192A6.507,6.507,0,0,1,17.6,17.6Z"
                  transform="translate(38.6 204)"
                  fill="#ffffff"
                />
              </g>
            </DarkModeSwitchButtonContainer>
          ) : (
            <DarkModeSwitchButtonContainer
              // Moon Icon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 41 41"
              width="40"
              height="40"
              onClick={() => globalState.darkMode.toggleDarkMode()}
            >
              <g transform="translate(-32 -197)">
                <circle cx="20" cy="20" r="20" transform="translate(32 197)" fill={globalThemeColour} />
                <path
                  d="M11,22a10.98,10.98,0,0,0,8.545-4.073.516.516,0,0,0-.5-.832A8.618,8.618,0,0,1,13.172,1.139a.516.516,0,0,0-.161-.955A11,11,0,1,0,11,22Z"
                  transform="translate(38.651 211.476) rotate(-27)"
                  fill="#ffffff"
                />
              </g>
            </DarkModeSwitchButtonContainer>
          )}
        </React.Fragment>
      )}
    </globalStateContext.Consumer>
  );
};

export default DarkModeSwitchButton;

const DarkModeSwitchButtonContainer = styled.svg`
  z-index: 0;

  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: all 0.1s ease-in-out;
  }
`;
