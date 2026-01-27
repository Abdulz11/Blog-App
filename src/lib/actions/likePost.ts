"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "../db/models";

export const likePost = (body: {
  postId: string;
  email: string;
  liked: boolean;
}) => {};

// export const likePost = async ({
//   postId,
//   email,
//   liked,
// }: {
//   postId: string;
//   email: string;
//   liked: boolean;
// }) => {
//   try {
//     if (liked && email) {
//       await Post.updateOne({ _id: postId }, { $push: { likes: email } });
//       const updated = await User.updateOne(
//         { email: email },
//         { $push: { likedPosts: postId } },
//         { new: true }
//       );
//       console.log(await Post.find({ _id: postId }));
//     } else {
//       await Post.updateOne({ userEmail: email }, { $pull: { likes: email } });
//       const updated = await User.updateOne(
//         { email: email },
//         { $pull: { likedPosts: postId } }
//       );
//       console.log(await Post.find({ _id: postId }));
//       // console.log(id);
//       revalidatePath("/profile");
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
