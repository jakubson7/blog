import { Document, Schema, model } from 'mongoose';
import PostType from '@@types/Post';

interface PostModel extends PostType, Document {};

const postSchema = new Schema({
  path: {
    type: String,
    maxlength: [128, 'name cannot be more than 128 characters'],
    required: true,
    unique: true,
  },
  author: {
    type: String,
    maxlength: [64, 'author cannot be more tahn 64 characters'],
    required: true,
  },
  header: {
    type: String,
    required: true,
    maxlength: [128, 'header cannot be more than 128 characters'],
  },
  content: {
    type: String,
    required: true,
    maxlength: [65536, 'content cannot be more than 65536 characters'],
  },
});

export default model<PostModel>('post', postSchema);
