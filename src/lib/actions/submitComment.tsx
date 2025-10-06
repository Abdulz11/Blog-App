"use server";

import { revalidatePath } from "next/cache";
import { Post } from "../db/models";

export default async function submitComment(formData: FormData) {
  let { comment, userEmail, postId } = Object.fromEntries(formData.entries());
  try {
    const theCommentOnPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { comment, email: userEmail } },
      },
      { new: true }
    );
    revalidatePath("/page/.*");
  } catch (e) {
    console.log(e);
  }
}
