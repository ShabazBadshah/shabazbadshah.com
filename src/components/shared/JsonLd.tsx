import React from 'react';
import Head from 'next/head';

type Props = {
  id: string;
  data: Record<string, unknown>;
};

/** Renders a JSON-LD block into <head>. `<` is escaped so content can't close the script tag. */
const JsonLd = ({ id, data }: Props): JSX.Element => (
  <Head>
    <script
      key={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  </Head>
);

export default JsonLd;
