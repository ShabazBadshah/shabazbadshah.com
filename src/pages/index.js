import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout.js';
import Image from '../components/image.js';
import SEO from '../components/seo.js';

import Header from '../components/header/header.js';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Header headerTitle="shabaz badshah" />

    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image to="/" />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
