import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

interface Props {
  users: any[];
}

const PostPage: React.FC<Props> = ({ users }) => {
  useEffect(() => {
    console.log(users);
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>
          <pre>
            {JSON.stringify(user)}
          </pre>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const response = await axios('http://localhost:2000');

  return {
    props: {
      users: response.data.list,
    },
  };
}

export default PostPage;
