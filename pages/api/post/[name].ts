import connectDatabase from '@utils/connectDatabase';
import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '@models/Post';

connectDatabase();

export default connect()
  .get(async ({ query }: NextApiRequest, response: NextApiResponse) => {
    try {
      // @ts-ignore
      const post = await Post.findOne({ path: query.name });
      response.status(200).json({ error: null, post: post.toJSON()});
    } catch(error) {
      response.status(200).json({ error, post: null });
    }
  })
  .post(async ({ query, body }: NextApiRequest, response: NextApiResponse) => {
    console.log({ query, body });
    try {
      const post = await Post.create({
        // @ts-ignore
        path: query.name,
        author: body.author,
        content: body.content,
        header: body.header,
      });
      await post.save();
      response.status(200).json({ error: null });
    } catch(error) {
      response.status(200).json({ error });
    }
  })
  .put(async ({ query, body }: NextApiRequest, response: NextApiResponse) => {
    try {
      // @ts-ignore
      const post = await Post.findOne({ path: query.name });
      await post.update({ content: body.content });
      await post.save();
      response.status(200).json({ error: null });
    } catch(error) {
      response.status(200).json({ error });
    }
  });
