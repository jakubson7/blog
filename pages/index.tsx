import Post from '@models/Post';
import connectDatabase from '@utils/connectDatabase';
import { GetStaticProps } from 'next';
import React from 'react';
import Link from 'next/link';

interface PostData {
  header: string;
  path: string;
}
interface Props {
  posts: PostData[];
}

const IndexPage: React.FC<Props> = ({ posts }) => (
  <div className='page index-page'>
    <Link href='/post/new'>create new post</Link>
    <br/><br/><br/><br/>

    {posts && posts.map((post, index) => (
        <article className='post' key={index}>
          <header>
            {post.header}
          </header>
          <Link href={`/post/${post.path}`}>
            go to
          </Link>
          <br/>
          <Link href={`/post/${post.path}/edit`}>
            edit
          </Link>
          <br/><br/><br/><br/>
        </article>
    ))}
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  await connectDatabase()

  try {
    const response = await Post.find({});
    const posts = response.reduce((posts, post) => [...posts, {
      header: post.header,
      path: post.path,
    }], []);

    console.log({ response, posts });

    return {
      props: {
        posts,
      },
      revalidate: 60,
    }
  } catch(error) {
    console.log(error);
    return {
      props: {
        posts: [],
      },
    }
  }
}

export default IndexPage;
