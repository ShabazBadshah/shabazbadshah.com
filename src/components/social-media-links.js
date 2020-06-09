import PropTypes from 'prop-types';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

import { useStaticQuery, graphql } from 'gatsby';

import { headShake } from 'react-animations';
import { deviceMaxWidth } from '../../static/media-query-sizes.js';
import Img from 'gatsby-image';
import { globalThemeColour, darkModeThemeColour } from '../assets/global-style-constants.js';

const SocialMediaLinks = ({ enableDarkMode }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "avatar.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

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
    <StyledContactCard enableDarkMode={enableDarkMode}>
      <StyledImage fluid={data.file.childImageSharp.fluid} />
      <StyledCardTitle>Get in touch</StyledCardTitle>
      <StyledCardSubtitle>Find me online at the places below, or just shoot me an email</StyledCardSubtitle>

      <StyledSocialMediaLinksWrapper>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`mailto:${data.site.siteMetadata.contactInfo.email}Subject=Hey%20Shabaz`}
        >
          <StyledSocialMediaLink enableDarkMode={enableDarkMode}>
            <FaEnvelope color={enableDarkMode ? 'white' : globalThemeColour} size="1.7em" />
            <StyledSocialMediaLinkText enableDarkMode={enableDarkMode}>Email</StyledSocialMediaLinkText>
          </StyledSocialMediaLink>
        </a>
        <a target="_blank" rel="noopener noreferrer" href={data.site.siteMetadata.contactInfo.github}>
          <StyledSocialMediaLink enableDarkMode={enableDarkMode}>
            <FaGithub color={enableDarkMode ? 'white' : globalThemeColour} size="1.7em" />
            <StyledSocialMediaLinkText enableDarkMode={enableDarkMode}>Github</StyledSocialMediaLinkText>
          </StyledSocialMediaLink>
        </a>
        <a target="_blank" rel="noopener noreferrer" href={data.site.siteMetadata.contactInfo.linkedin}>
          <StyledSocialMediaLink enableDarkMode={enableDarkMode}>
            <FaLinkedin color={enableDarkMode ? 'white' : globalThemeColour} size="1.7em" />
            <StyledSocialMediaLinkText enableDarkMode={enableDarkMode}>LinkedIn</StyledSocialMediaLinkText>
          </StyledSocialMediaLink>
        </a>
      </StyledSocialMediaLinksWrapper>
    </StyledContactCard>
  );
};

export default SocialMediaLinks;

SocialMediaLinks.propTypes = {
  enableDarkMode: PropTypes.bool,
};

SocialMediaLinks.defaultProps = {
  enableDarkMode: false,
};

const StyledSocialMediaLinkText = styled.h3`
  color: ${(props) => (props.enableDarkMode ? '#f9f8f7' : '#080708')};
  margin-left: 1rem;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: normal;
  margin: 0 1rem;
`;

const StyledCardTitle = styled.h3`
  font-size: 1.5rem;
  color: #f9f8f7;
  margin: 1.5rem 0 1rem 0;
`;

const StyledCardSubtitle = styled.h4`
  text-align: center;
  margin: 0.5rem 0;
  font-size: 1.1rem;
  font-weight: normal;
  color: #f9f8f7;
  line-height: 1.5rem;
  word-spacing: 0.11rem;
`;

const StyledSocialMediaLinksWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 0;
  width: 100%;

  & a {
    text-decoration: none;
  }
`;

const StyledSocialMediaLink = styled.li`
  padding: 0.6rem 1rem;
  background-color: ${(props) => (props.enableDarkMode ? darkModeThemeColour : '#f9f8f7')};
  margin: 1rem 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  &:hover {
    animation: ${keyframes`${headShake}`} 800ms ease-in-out;
    box-shadow: 0.5em 0.5em 1.5em 0 rgba(85, 85, 85, 0.3);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledImage = styled(Img)`
  border-radius: 50%;
  width: 120px;
  height: 120px;
`;

const StyledContactCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${globalThemeColour};
  padding: 2em;
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.enableDarkMode
      ? '0.5rem 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.3)'
      : '0.5rem 0.5rem 1.5rem 0 rgba(85, 85, 85, 0.2)'};
  min-width: 300px;
  margin-right: 5rem;

  @media only screen and ${deviceMaxWidth.tablet} {
    margin-right: 3rem;
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 2rem 1rem 1rem 1rem;
  }
`;
