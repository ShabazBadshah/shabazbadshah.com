import React from 'react';
import PropTypes from 'prop-types';

import { globalThemeColour } from '../../assets/globalStyleConstants.js';

const EmailContactIcon = ({ colour }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28.75" height="21" viewBox="0 0 28.75 23">
      <path
        d="M28.875,6h-23A2.871,2.871,0,0,0,3.014,8.875L3,26.125A2.883,2.883,0,0,0,5.875,29h23a2.883,2.883,0,0,0,2.875-2.875V8.875A2.883,2.883,0,0,0,28.875,6Zm0,5.75-11.5,7.187L5.875,11.75V8.875l11.5,7.188,11.5-7.187Z"
        transform="translate(-3 -6)"
        fill={colour}
      />
    </svg>
  );
};

export default EmailContactIcon;

EmailContactIcon.propTypes = {
  colour: PropTypes.string,
};

EmailContactIcon.defaultProps = {
  colour: globalThemeColour,
};
