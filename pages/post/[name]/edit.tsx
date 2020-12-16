import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Editor from '@components/Editor';
import axios from 'axios';

const NewPostPage: React.FC = () => {
  const [header, setHeader] = useState<string>('name of your new post');
  const [content, setContent] = useState<string>('');
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/post/${query.name[0]}`)
      const { error, post } = data;

      if(error) {
        setHeader('-- error --');
        return;
      }
      setHeader(post.header);
      setContent(post.content);
    })();
  }, []);

  const handleSave = async input => {
    axios.put(`/api/post/${header}`, {
      content: input,
    });
  }

  return (
    <div className='page new-post-page'>
      <header>
        <p>name of your new post</p>
      </header>
      <Editor save={handleSave} content={content}/>
    </div>
  );
}

export default NewPostPage;
