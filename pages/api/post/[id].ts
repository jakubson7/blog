import connectDatabase from '@utils/connectDatabase';
import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '@models/Post';

connectDatabase();

export default connect()
  .get(async ({ query }: NextApiRequest, response: NextApiResponse) => {
    const post = await Post.findById(query.id);
    response.status(200).json(post.toJSON());
  })
  .post(async ({ query, body }: NextApiRequest, response: NextApiResponse) => {
    try {
      const post = await Post.create({
        name: query.id[0],
        author: body.author,
        content: body.content,
      });
      await post.save();
      response.status(200).json({ error: null });
    } catch(error) {
      response.status(200).json({ error });
    }
  })
  .put(async ({ query, body }: NextApiRequest, response: NextApiResponse) => {
    const post = await Post.findById(query.id);
    await post.update({
      content: body.content,
    });
  })
  .delete(async ({ query, body }: NextApiRequest, response: NextApiResponse) => {
    await Post.findByIdAndDelete(query.id);
  });
