import { Post, User } from "./models";
import connectToDb from "./utils";
import { IPost, IUser } from "./models";
import { ObjectId } from "mongoose";

// interface
export interface UserWithDates extends IUser {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostWithDates extends IPost {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// fetch all post
export async function fetchPosts(
  email: string
): Promise<PostWithDates[] | undefined> {
  try {
    await connectToDb();
    let posts;
    if (email) {
      posts = await Post.find<PostWithDates>({ email: email });
    } else {
      posts = await Post.find<PostWithDates>();
    }
    return posts;
  } catch (e) {
    if (typeof e === "string") {
      throw new Error(e);
    }
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Something went wrong when fetching posts");
  }
}

// fetch single post
export async function fetchPost(id: string): Promise<PostWithDates | null> {
  try {
    connectToDb();
    const post = await Post.findById<PostWithDates>(id);
    // console.log(post);
    return post;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// fetch all users
// export async function fetchUsers(): Promise<IUser[]> {
//   try {
//     connectToDb();
//     const users = await User.find<IUser>();
//     return users;
//   } catch (err) {
//     console.log(err);
//   } finally {
//     return [];
//   }
// }

// fetch user
export async function fetchUser(
  userEmail: string
): Promise<UserWithDates | null> {
  try {
    console.log(userEmail);
    await connectToDb();
    const user = await User.findOne({ email: userEmail }).populate("posts");
    // console.log(user.posts);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// fetch author
export async function fetchAuthor(email: string): Promise<IUser | null> {
  try {
    await connectToDb();
    const user = await User.findOne({ email: email });
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
