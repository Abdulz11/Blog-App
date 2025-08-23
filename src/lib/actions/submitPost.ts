"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { Post, User } from "../db/models";
import connectToDb from "../db/utils";
import { redirect } from "next/navigation";

export async function submitBlogPost(data: FormData) {
  let { title, body, image } = Object.fromEntries(data.entries());

  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  try {
    await connectToDb();
    const res = await fetch(image as string);
    if (res.ok) {
      console.log("image is good");
    }
    let post = new Post({
      title,
      body,
      image,
      userEmail: session?.user?.email,
    });

    console.log(post);

    const createdPost = await post.save();
    // await User.updateOne(
    //   { email: session?.user?.email },
    //   { $push: { posts: createdPost._id } }
    // );
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/blog");
  redirect("/blog");
}
