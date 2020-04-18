import React from 'react';
import PropTypes from 'prop-types';

import { globalThemeColor } from '../../assets/globalStyles.js';

const LinkedinLogo = ({ colour }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30.001" height="30" viewBox="0 0 30.001 30">
      <path
        d="M6.715,30H.5V9.971h6.22ZM3.6,7.239A3.619,3.619,0,1,1,7.2,3.6,3.632,3.632,0,0,1,3.6,7.239ZM29.994,30H23.788V20.25c0-2.324-.047-5.3-3.234-5.3-3.234,0-3.729,2.525-3.729,5.136V30H10.611V9.971h5.965V12.7h.087a6.536,6.536,0,0,1,5.885-3.234C28.844,9.469,30,13.614,30,19V30Z"
        transform="translate(0 -0.001)"
        fill={colour}
      />
    </svg>
  );
};

export default LinkedinLogo;

LinkedinLogo.propTypes = {
  colour: PropTypes.string,
};

LinkedinLogo.defaultProps = {
  colour: globalThemeColor,
};
