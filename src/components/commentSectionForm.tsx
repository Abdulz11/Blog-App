"use client";
import submitComment from "@/lib/actions/submitComment";
import styles from "../components/Comments/commentsSection.module.css";
import { useRef } from "react";

export default function CommentSectionForm(props: {
  email: string | undefined;
  postId: string | undefined;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  console.log(formRef);

  const handleSubmitPost = async (formData: FormData) => {
    await submitComment(formData);
    console.log("clicked");
    formRef.current?.reset();
  };
  return (
    <>
      <form className={styles.form} action={handleSubmitPost} ref={formRef}>
        <textarea name='comment' id='' placeholder='Comment...' />
        <input type='hidden' value={props.postId} name='postId' />
        <input type='hidden' value={props.email} name='userEmail' />
        <button className={styles.commentBtn}>Comment</button>
      </form>
    </>
  );
}
