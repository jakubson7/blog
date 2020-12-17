import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Editor from '@components/Editor';
import axios from 'axios';

const NewPostPage: React.FC = () => {
  const [header, setHeader] = useState<string>('loading...');
  const [content, setContent] = useState<string>('loading...');
  const { query } = useRouter();

  useEffect(() => {
    query.name && (async () => {
      const { data } = await axios.get(`/api/post/${query.name}`)
      const { error, post } = data;
      console.log({ header, content, post });

      if(error) {
        setHeader('-- error --');
        setContent('-- error --');
        return;
      }

      setHeader(post.header);
      setContent(post.content);

      console.log({ header, content, post });
    })();
  }, [query]);

  const handleSave = async input => {
    console.log({ query, input });
    await axios.put(`/api/post/${query.name}`, {
      content: input,
    });
  }

  return (
    <div className='page new-post-page'>
      <header>
        <p>{header}</p>
      </header>
      <Editor save={handleSave} content={content}/>
    </div>
  );
}

export default NewPostPage;
