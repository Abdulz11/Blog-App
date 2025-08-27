import mongoose, { Types } from "mongoose";
import { PostWithDates } from "./data";
import { ObjectId } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  img?: string;
  posts?: PostWithDates[];
}

export interface IPost {
  author: string;
  title: string;
  body: string;
  image?: string;
  userEmail: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    posts: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema<IPost>(
  {
    author: {
      type: String,
    },

    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export const Post =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);
