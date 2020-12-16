import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

interface Props {
  language: string;
  value: string | undefined;
}

const CodeSynthax: React.FC<Props> = ({ language, value }) => (
  <SyntaxHighlighter language={language ?? null} style={docco}>
    {value ?? ''}
  </SyntaxHighlighter>
);

export default CodeSynthax;
