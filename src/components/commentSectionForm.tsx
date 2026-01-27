"use client";
import submitComment from "@/lib/actions/submitComment";
import styles from "../components/Comments/commentsSection.module.css";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function CommentSectionForm(props: {
  email: string | undefined;
  postId: string | undefined;
  isAuth: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSubmitPost = async (formData: FormData) => {
    if (!props.isAuth) {
      return await signIn("google", { redirectTo: callbackUrl as string });
    }
    await submitComment(formData);
    formRef.current?.reset();
  };
  return (
    <>
      <form className={styles.form} action={handleSubmitPost} ref={formRef}>
        <textarea name='comment' id='' placeholder='Comment...' />
        <input type='hidden' value={props.postId} name='postId' />
        <input type='hidden' value={props.email} name='userEmail' />
        <button className={styles.commentBtn}>
          {props.isAuth ? "Comment" : "Log in to comment"}
        </button>
      </form>
    </>
  );
}
