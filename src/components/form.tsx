"use client";
import { submitFunction } from "@/lib/actions/submitPostWrapper";
import styles from "./../app/write/write.module.css";
import SubmitFormButton from "./submitFormButton";
// import { PostWithDates } from '@/lib/db/data';
import { useParams, useSearchParams } from "next/navigation";

export default function Form(props: {
  post: {
    title: string | undefined;
    body: string | undefined;
    image: string | undefined;
  } | null;
}) {
  const { post } = props;

  const id = useSearchParams().get("id") as string;
  const edit = useSearchParams().get("edit");

  return (
    <form className={styles.form} action={submitFunction}>
      <input
        name='title'
        placeholder='Title'
        maxLength={40}
        required
        defaultValue={post ? post.title : undefined}
      />
      <input
        name='image'
        placeholder='Img-url'
        defaultValue={post ? post.image : undefined}
      />
      <textarea
        name='body'
        placeholder='Message'
        required
        defaultValue={post ? post.body : undefined}
      />
      <input name='edit' type='hidden' value={edit ? id : undefined} />
      <SubmitFormButton />
    </form>
  );
}
