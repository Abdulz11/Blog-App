import { Post, User } from "@/lib/db/models";
import mongoose, { Schema } from "mongoose";
import { NextResponse } from "next/server";
import { ObjectId } from "mongoose";

export async function POST(req: Request) {
  const request = await req.json();
  console.log(request);
  const { postId, email, liked } = request;

  // console.log(user);
  if (liked && email) {
    await Post.updateOne({ _id: postId }, { $push: { likes: email } });
    const updated = await User.updateOne(
      { email: email },
      { $push: { likedPosts: postId } },
      { new: true }
    );
    console.log(await Post.find({ _id: postId }));
  } else {
    await Post.updateOne({ userEmail: email }, { $pull: { likes: email } });
    const updated = await User.updateOne(
      { email: email },
      { $pull: { likedPosts: postId } }
    );
    console.log(await Post.find({ _id: postId }));
  }
  return NextResponse.json(request);
}
