import { ObjectId } from "mongoose";

export interface IUser {
  username: string;
  author?: string;
  email: string;
  img?: string;
  posts?: PostWithDates[];
  likedPosts?: string[];
}

export interface IPost {
  author: string;
  title: string;
  body: { content: string; createdAt: Date; updatedAt?: Date };
  image?: string;
  email: string;
  likes?: string[];
  comments?: { comment: string; email: string }[];
}

export interface UserWithDates extends IUser {
  _id: ObjectId;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface PostWithDates extends IPost {
  _id: ObjectId;
  createdAt: Date | string;
  updatedAt: Date | string;
}
