import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';

import GithubLogo from './github-logo.js';
import LinkedinLogo from './linkedin-logo.js';
import EmailContactIcon from './email-contact-icon.js';

const SocialMediaLinks = () => (
  <SocialMediaLinksContainer>
    <GithubLogo colour="#ffffff" />
    <LinkedinLogo colour="#ffffff" />
    <EmailContactIcon colour="#ffffff" />
  </SocialMediaLinksContainer>
);

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
