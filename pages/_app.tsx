import React from 'react';

import '@styles/global.scss';
import '@styles/editor.scss';
import '@styles/post.scss';

const App: React.FC<any> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
