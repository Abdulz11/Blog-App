"use server";

import { revalidatePath } from "next/cache";
import { deleteAllPost, deletePost } from "../db/data";

export const handleDeletePost = async (id: string) => {
  try {
    await deletePost(id);
    revalidatePath("/profile");
  } catch (e) {
    console.log(e);
  }
};

export const handleDeleteAllPost = async (email: string) => {
  try {
    await deleteAllPost(email);
    revalidatePath("/profile");
  } catch (e) {
    console.log(e);
  }
};
