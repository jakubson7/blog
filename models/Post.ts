import mongoose, { Document, Schema, model } from 'mongoose';

interface Post extends Document {
  name: string;
  author: string;
  content: string;
}

const PostSchema = new Schema({
  name: {
    type: String,
    maxlength: [128, 'name cannot be more than 128 characters'],
    required: true,
    unique: true,
  },
  author: {
    type: String,
    maxlength: [256, 'author cannot be more tahn 128 characters'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default model<Post>('post', PostSchema);
