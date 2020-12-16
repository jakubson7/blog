import connectDatabase from '@utils/connectDatabase';
import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '@models/Post';

connectDatabase();

export default connect()
  .get(async ({ query }: NextApiRequest, response: NextApiResponse) => {
    try {
      const post = await Post.findOne({ name: query.name[0] });
      response.status(200).json({ error: null, post: post.toJSON()});
    } catch(error) {
      response.status(200).json({ error, post: null });
    }
  })
  .post(async ({ query, body }: NextApiRequest, response: NextApiResponse) => {
    try {
      const post = await Post.create({
        name: query.name[0],
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
      const post = await Post.findOne({ name: query.name[0] });
      post.update({ content: body.content })
      response.status(200).json({ error: null });
    } catch(error) {
      response.status(200).json({ error });
    }
  });
