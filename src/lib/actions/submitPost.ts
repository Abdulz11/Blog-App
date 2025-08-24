"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { Post, User } from "../db/models";
import connectToDb from "../db/utils";
import { redirect } from "next/navigation";
import { checkImageValidity, generateErrorMessage } from "../utilityFunctions";

export async function submitBlogPost(data: FormData) {
  let { title, body, image } = Object.fromEntries(data.entries());

  const session = await auth();
  console.log(image);

  if (!session?.user?.email) {
    redirect("/");
  }

  try {
    if (!image) {
      throw new Error("Add an image link");
    }
    await checkImageValidity(image as string);
    await connectToDb();
    let post = new Post({
      title,
      body,
      image,
      userEmail: session?.user?.email,
    });

    // console.log(post);
    const createdPost = await post.save();

    await User.updateOne(
      { email: session?.user?.email },
      { $push: { posts: createdPost._id } }
    );
  } catch (e) {
    // console.log(e);
    const errorMessage = generateErrorMessage(e);
    return errorMessage;
  }

  revalidatePath("/blog");
  redirect("/blog");
}
