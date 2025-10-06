import toast from "react-hot-toast";
import { submitBlogPost } from "./submitPost";

export async function submitFunction(formData: FormData) {
  // let data = Object.fromEntries(formData.entries());

  const errorMessage = await submitBlogPost(formData);
  if (errorMessage) {
    toast(errorMessage);
  }
}
