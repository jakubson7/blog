import React, { useState } from 'react';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import CodeSynthax from './CodeSynthax';

interface Props {
  save: (input: string) => Promise<void>;
  content: string;
}

const Editor: React.FC<Props> = ({ save, content }) => {
  const [input, setInput] = useState<string>(content);

  const handleChange = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setInput(event.currentTarget.value);
  }
  const handleSave = async () => {
    await save(input);
  }

  return (
    <div className='wraper'>
      <div className='editor'>
        <section className='input'>
          <textarea  onKeyUp={handleChange}></textarea>
        </section>
        <section className='output'>
          <Markdown
            className='markdown'
            source={input}
            plugins={[[ gfm ]]}
            renderers={{
              code: CodeSynthax,
            }}
          />
        </section>
      </div>
      <section className='control'>
        <button onClick={handleSave}>
          add post
        </button>
      </section>
    </div>
  );
}

export default Editor;
