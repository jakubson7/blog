import React from 'react';
import PostType from '@@types/Post';
import { GetStaticPaths, GetStaticProps } from 'next';
import Post from '@models/Post';
import connectDatabase from '@utils/connectDatabase';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import CodeSynthax from '@components/CodeSynthax';

interface Props {
  post: PostType | null;
  error: any | null;
}

const PostPage: React.FC<Props> = ({ post }) => {
  return (
    <div className='page post-page'>
      <article>
        <header>{post.header}</header>
        <p className='markdown'>
          <Markdown
            plugins={[[ gfm ]]}
            source={post.content}
            renderers={{
              code: CodeSynthax,
            }}
          />
        </p>
      </article>
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
    return {
      fallback: 'blocking',
      paths: [{ params: { name: 'error' }}],
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    await connectDatabase();
    const post = (await Post.findOne({ name: params.name[0] })).toJSON();

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
      revalidate: 60,
    }
  }
}

export default PostPage;
