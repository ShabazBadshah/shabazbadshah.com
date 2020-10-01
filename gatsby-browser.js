/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react';
import './static/normalize.css';

// import { MDXProvider } from '@mdx-js/react';
// import Highlight, { defaultProps } from 'prism-react-renderer';

// import dracula from 'prism-react-renderer/themes/duotoneDark';

import GlobalStateContextProvider from './src/contextProviders/global-state-context-provider.js';

// const component = {
//   pre: props => {
//     const className = props.children.props.className || '';
//     const matches = className.match(/language-(?<lang>.*)/);
//     return (
//       <Highlight
//         {...defaultProps}
//         code={props.children.props.children}
//         language={
//           matches && matches.groups && matches.groups.lang
//             ? matches.groups.lang
//             : ''
//         }
//         theme={dracula}
//       >
//         {({ className, style, tokens, getLineProps, getTokenProps }) => (
//           <pre className={className} style={style}>
//             {tokens.map((line, i) => (
//               <div {...getLineProps({ line, key: i })}>
//                 {line.map((token, key) => (
//                   <span {...getTokenProps({ token, key })} />
//                 ))}
//               </div>
//             ))}
//           </pre>
//         )}
//       </Highlight>
//     );
//   },
// };

export const wrapRootElement = ({ element }) => {
  return (
    <GlobalStateContextProvider>
      {element}
    </GlobalStateContextProvider>);
}
