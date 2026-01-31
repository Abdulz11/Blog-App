import styles from "../app/blog/blog.module.css";
import Link from "next/link";
import Image from "next/image";
import LikeButton from "./likeButton";
import { PostWithDates } from "@/lib/types";

const defaultImage = "/pexels-pixabay-157675.jpg";

export default function LikedBlogs(props: { posts: PostWithDates[] }) {
  if (props.posts.length == 0) {
    return <h1 style={{ marginTop: "5rem" }}>No Liked Post Yet</h1>;
  }

  return (
    <>
      <div className={styles.container}>
        {props.posts?.map((post: PostWithDates) => (
          <div className={styles.blog} key={post.title}>
            <div className={styles.top}>
              <div className={styles.imagebox}>
                <Link href={`/blog/${post._id}`}>
                  <Image
                    src={post.image || defaultImage}
                    alt='post image'
                    fill
                    priority
                    className={styles.image}
                  />
                </Link>
                <LikeButton
                  email={post.email}
                  postId={post._id.toString()}
                  usersLikedPosts={true}
                />
              </div>
              <span className={styles.date}>
                {typeof post.body.createdAt == "string"
                  ? (post.body.createdAt as string).split("T")[0]
                  : post.body.createdAt.toISOString().split("T")[0]}
              </span>
            </div>
            <div className={styles.textbox}>
              <h2>{post.title}</h2>
              <p className={styles.desc}>
                {post.body.content.length > 100
                  ? `${post.body.content.slice(0, 100)}...`
                  : post.body.content}
              </p>
              <p className={styles.author}>
                By{" "}
                {post.author
                  ? `${post.author?.charAt(0).toUpperCase()}${post?.author?.substring(1)}`
                  : "..."}
              </p>
              <Link href={`/blog/${post._id}`}>Read More </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
