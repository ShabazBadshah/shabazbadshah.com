import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { StyledPageHeaderTitle, StyledPageSubtitle } from '../components/styled-labels.js';

const NotFoundPage = () => (
  <Layout pageTitle="404 Not Found">
    <SEO title="404: Not found" />
    <StyledPageHeaderTitle>404 NOT FOUND</StyledPageHeaderTitle>
    <StyledPageSubtitle>
      You just hit a route that doesn&#39;t exist... launch back to homebase <a href="/">here</a> 🚀
    </StyledPageSubtitle>
  </Layout>
);

export default NotFoundPage;
