import mongoose from "mongoose";
import { IPost, IUser } from "../types";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
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
    likedPosts: {
      type: [{ type: String }],
    },
  },
  { timestamps: true },
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
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
        immutable: true,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    likes: { type: [{ type: String }] },
    comments: {
      type: [
        { email: { type: String, required: true }, comment: { type: String } },
      ],
    },
  },
  { timestamps: true },
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export const Post =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);
