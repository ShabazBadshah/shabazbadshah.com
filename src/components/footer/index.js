import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { Container, Row } from 'react-grid-system';

import { FaLinkedinIn } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          contactInfo {
            github
            linkedin
          }
        }
      }
    }
  `);

  return (
    <StyledFooter>
      <Container>
        <Row justify="center">
          <StyledSocialMediaIcon href={data.site.siteMetadata.contactInfo.linkedin}>
            <FaLinkedinIn />
          </StyledSocialMediaIcon>

          <StyledSocialMediaIcon href={data.site.siteMetadata.contactInfo.github}>
            <AiFillGithub />
          </StyledSocialMediaIcon>
        </Row>
      </Container>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  padding-bottom: 3rem;
  background-color: ${(props) => props.theme.siteBg};
`;

const StyledSocialMediaIcon = styled.a`
  svg {
    transform: scale(1.75);
    margin: auto 1.5rem;
    color: ${(props) => props.theme.text};

    &:hover {
      cursor: pointer;
    }
  }
`;
