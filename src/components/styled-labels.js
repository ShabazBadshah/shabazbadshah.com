import styled from 'styled-components';
import { globalThemeColour } from '../assets/global-style-constants.js';

export const StyledPageHeaderTitle = styled.h1`
  font-size: 4rem;
  font-weight: bolder;
  color: ${globalThemeColour};
`;

export const StyledPageSubtitle = styled.h3`
  font-size: 2rem;
  font-weight: normal;
  font-style: italic;
  line-height: 2.7rem;

  & > a {
    color: ${globalThemeColour};
  }
`;
