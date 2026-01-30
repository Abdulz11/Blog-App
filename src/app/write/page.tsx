import styles from "./write.module.css";
import Image from "next/image";
import Form from "@/components/form";
import { Metadata } from "next";
import { Post } from "@/lib/db/models";
import { fetchPost } from "@/lib/db/data";

export const metadata: Metadata = {
  title: "Blog App | Write ",
  description: "All Blogs",
};

async function writeBlog(params: {
  params: {};
  searchParams: { edit: boolean; id: string };
}) {
  const { edit, id } = params.searchParams;
  let post;

  if (edit) {
    const fetchedPost = await fetchPost(id);
    post = {
      body: fetchedPost?.body.content,
      title: fetchedPost?.title,
      image: fetchedPost?.image,
    };
  } else {
    post = null;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imagebox}>
          <Image
            src='/creativity.avif'
            priority
            fill
            alt='hero'
            className={styles.image}
          />
        </div>
        <Form post={post} />
      </div>
    </>
  );
}

export default writeBlog;
