import React, { useState } from 'react';
import Editor from '@components/Editor';
import axios from 'axios';

const NewPostPage: React.FC = () => {
  const [header, setHeader] = useState<string>('name of your new post');

  const handleChange = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
    setHeader(event.currentTarget.textContent);
  }
  const handleSave = async input => {
    axios.post(`/api/post/${header}`, {
      name: header.replaceAll(' ', '-').replace(/[!@#$%^&*_()[]{}="']/g, ''),
      header,
      content: input,
      author: 'test',
    });
  }

  return (
    <div className='page new-post-page'>
      <header>
        <p onKeyUp={handleChange} contentEditable>name of your new post</p>
      </header>
      <Editor save={handleSave} content=''/>
    </div>
  );
}

export default NewPostPage;
