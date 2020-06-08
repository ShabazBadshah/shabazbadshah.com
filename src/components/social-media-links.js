import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

import { useStaticQuery, graphql } from 'gatsby';

import { deviceMaxWidth } from '../../static/media-query-sizes.js';
import { globalThemeColour } from '../assets/global-style-constants.js';

const SocialMediaLinks = ({ enableDarkMode }) => {
  const contactInfo = useStaticQuery(graphql`
    query ContactInfoQuery {
      site {
        siteMetadata {
          contactInfo {
            email
            github
            linkedin
          }
        }
      }
    }
  `);

  return (
    <SocialMediaLinksContainer enableDarkMode={enableDarkMode}>
      <a target="_blank" rel="noopener noreferrer" href={contactInfo.site.siteMetadata.contactInfo.github}>
        <FaGithub color={enableDarkMode ? 'white' : globalThemeColour} size="1.3em" />
      </a>
      <a target="_blank" rel="noopener noreferrer" href={contactInfo.site.siteMetadata.contactInfo.linkedin}>
        <FaLinkedin color={enableDarkMode ? 'white' : globalThemeColour} size="1.4em" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`mailto:${contactInfo.site.siteMetadata.contactInfo.email}Subject=Hey%20Shabaz`}
      >
        <FaEnvelope color={enableDarkMode ? 'white' : globalThemeColour} size="1.2em" />
      </a>
    </SocialMediaLinksContainer>
  );
};

export default SocialMediaLinks;

SocialMediaLinks.propTypes = {
  enableDarkMode: PropTypes.bool,
};

SocialMediaLinks.defaultProps = {
  enableDarkMode: false,
};

const SocialMediaLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 5px;

  & > *:not(:last-child) {
    margin-right: 25px;
  }

  &:last-child {
    margin-right: 15px;
  }

  @media ${deviceMaxWidth.tablet} {
    position: static;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: ${(props) => (props.enableDarkMode ? `1px ${globalThemeColour} solid` : '1px #f5f5f5 solid')};
    box-shadow: 5px 0 5px 0 rgba(0, 0, 0, 0.02);
    background-color: ${(props) => (props.enableDarkMode ? '#2d2d2d' : 'orange')};
    bottom: unset;
    padding: 10px 10px 8px 10px;
    z-index: 1;

    & > * {
      margin: 0;
      margin-right: 20px;
    }

    & > *:not(:first-child) {
      margin-top: 0;
    }

    /* Adjust margin of Linkedin icon  */
    & > *:last-child {
      margin-top: 2px;
      margin-right: 0;
    }
  }
`;
