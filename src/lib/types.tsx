import { ObjectId } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  img?: string;
  posts?: PostWithDates[];
  likedPosts?: string[];
}

export interface IPost {
  author: string;
  title: string;
  body: string;
  image?: string;
  userEmail: string;
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
