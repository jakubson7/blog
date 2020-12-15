import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Post, { Post as PostInterface } from '@models/Post';
import connectDatabase from '@utils/connectDatabase';

interface Props {
  post: PostInterface | null;
  error: any | null;
}

const PostPage: React.FC<Props> = ({ post }) => {
  return (
    <div>
      <pre>
        {JSON.stringify(post)}
      </pre>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<{ name: string }> = async context => {
  try {
    await connectDatabase();
    const posts = await Post.find({});

    return {
      fallback: false,
      paths: posts.reduce((paths, post) => [...paths, { params: { name: post.name }}], []),
    }
  } catch(error) {
    console.log(error);
    return {
      fallback: false,
      paths: [{ params: { name: 'error' }}],
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    await connectDatabase();
    const post = await Post.findOne({ name: params.name[0] });

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
      },
    }
  } catch(error) {
    return {
      props: {
        post: null,
        error: JSON.parse(JSON.stringify(error)),
      },
    }
  }
}

export default PostPage;
