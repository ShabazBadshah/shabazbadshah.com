import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { useStaticQuery, graphql } from 'gatsby';

import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';

import GithubLogo from './github-logo.js';
import LinkedinLogo from './linkedin-logo.js';
import EmailContactIcon from './email-contact-icon.js';

const SocialMediaLinks = () => {
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
    <SocialMediaLinksContainer>
      <a target="_blank" href={contactInfo.site.siteMetadata.contactInfo.github}>
        {' '}
        <GithubLogo colour="#ffffff" />{' '}
      </a>

      <a target="_blank" href={contactInfo.site.siteMetadata.contactInfo.linkedin}>
        <LinkedinLogo colour="#ffffff" />
      </a>

      <a target="_blank" href={`mailto:${contactInfo.site.siteMetadata.contactInfo.email}Subject=Hey%20Shabaz`}>
        <EmailContactIcon colour="#ffffff" />
      </a>
    </SocialMediaLinksContainer>
  );
};

export default SocialMediaLinks;

const SocialMediaLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  /* Align links to bottom of header */
  position: absolute;
  bottom: 40px;

  & > *:not(:first-child) {
    margin-top: 30px;
  }
`;
