"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { Post, User } from "../db/models";
import connectToDb from "../db/connectDb";
import { redirect } from "next/navigation";
import { checkImageValidity, generateErrorMessage } from "../utilityFunctions";

export async function submitBlogPost(data: FormData) {
  let { title, body, image, edit: id } = Object.fromEntries(data.entries());

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

    // if id exists ,it means its an update if it dosent its a new post entirely
    if (id) {
      await Post.findByIdAndUpdate(id, {
        $set: {
          title,
          "body.content": body,
          "body.updatedAt": new Date(),
          image,
        },
      });
    } else {
      let fetchedUser = await User.findOne({ email: session?.user?.email });
      let post = new Post({
        author: fetchedUser.author,
        title,
        body: { content: body, createdAt: new Date(), updatedAt: new Date() },
        image,
        email: session?.user?.email,
      });

      // console.log(post);
      const createdPost = await post.save();

      const updatedUser = await User.updateOne(
        { email: session?.user?.email },
        { $push: { posts: createdPost._id } },
      );
    }
  } catch (e) {
    // console.log(e);
    const errorMessage = generateErrorMessage(e);
    return errorMessage;
  }

  if (id) {
    revalidatePath("/profile");
    redirect("/profile");
  } else {
    revalidatePath("/blog");
    redirect("/blog");
  }
}
