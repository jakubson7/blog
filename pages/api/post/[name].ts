import connectDatabase from '@utils/connectDatabase';
import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '@models/Post';
import convertToPath from '@utils/convertToPath';

connectDatabase();

export default connect()
  .get(async ({ query }: NextApiRequest, response: NextApiResponse) => {
    try {
      // @ts-ignore
      const post = await Post.findOne({ path: 'name-of-your-new-post' });
      response.status(200).json({ error: null, post: post.toJSON()});
    } catch(error) {
      console.log(error);
      response.status(200).json({ error, post: null });
    }
  })
  .post(async ({ query, body }: NextApiRequest, response: NextApiResponse) => {
    try {
      const post = await Post.create({
        // @ts-ignore
        path: convertToPath(query.name),
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
