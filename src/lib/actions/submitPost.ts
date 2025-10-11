"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { Post, User } from "../db/models";
import connectToDb from "../db/connectDb";
import { redirect } from "next/navigation";
import { checkImageValidity, generateErrorMessage } from "../utilityFunctions";

export async function submitBlogPost(data: FormData) {
  let { title, body, image, edit } = Object.fromEntries(data.entries());

  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }
  try {
    if (!image) {
      throw new Error("Add an image link");
    }
    await checkImageValidity(image as string);
    await connectToDb();
    if (edit) {
      await Post.findByIdAndUpdate(edit, {
        title,
        body,
        image,
      });
    } else {
      let fetchedUser = await User.findOne({ email: session?.user?.email });
      let post = new Post({
        author: fetchedUser.author,
        title,
        body,
        image,
        userEmail: session?.user?.email,
      });

      // console.log(post);
      const createdPost = await post.save();

      const updatedUser = await User.updateOne(
        { email: session?.user?.email },
        { $push: { posts: createdPost._id } }
      );
    }
  } catch (e) {
    // console.log(e);
    const errorMessage = generateErrorMessage(e);
    return errorMessage;
  }

  if (edit) {
    revalidatePath("/profile");
    redirect("/profile");
  } else {
    revalidatePath("/blog");
    redirect("/blog");
  }
}
