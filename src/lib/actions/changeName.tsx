"use server";

import { Post, User } from "../db/models";
import { MongoClient } from "mongodb";

// const client = new MongoClient(process.env.MONGODBNET!);

export async function changeName(_prevState: any, data: FormData) {
  // const session = client.startSession();
  let { author, email } = Object.fromEntries(data.entries());
  try {
    const user = await User.updateOne({ email }, { $set: { author } });
    const posts = await Post.updateMany({ email }, { $set: { author } });
    return { message: "success" };
  } catch (e) {
    console.log(e);
    return { message: "error" };
  }
}
