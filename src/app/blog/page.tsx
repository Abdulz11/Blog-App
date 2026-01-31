import Image from "next/image";
import Link from "next/link";
import styles from "./blog.module.css";
import { fetchPosts, fetchUser } from "../../lib/db/data";
import { Metadata } from "next";
import LikesAndComments from "@/components/CommentsCount/commentsCount";
import LikeButton from "@/components/likeButton";
import { getToken } from "next-auth/jwt";
import { auth } from "@/lib/auth";
import CommentsCount from "@/components/CommentsCount/commentsCount";
import { PostWithDates, UserWithDates } from "@/lib/types";
import LikeAPost from "@/components/LikeAPost";
import LoginInModal from "@/components/Modal/logInModal";

const defaultImage = "/pexels-pixabay-157675.jpg";

// metadata
export const metadata: Metadata = {
  title: "Blog App | Blogs page",
  description: "All Blogs",
};

export default async function Blogs() {
  const session = await auth();
  // console.log(session);
  // @ts-ignore
  let posts = await fetchPosts();

  let user = await fetchUser(session?.user?.email as string);

  // let user = (await fetchUser("dullas@gmail.com")) as UserWithDates;
  let usersLikedPosts: UserWithDates = JSON.parse(JSON.stringify(user));

  if (!posts || posts.length == 0)
    return <h1 style={{ textAlign: "center" }}>No posts yet</h1>;

  return (
    <>
      <div className={styles.container}>
        {posts?.map((post: PostWithDates) => (
          <div className={styles.blog} key={post.title}>
            <div className={styles.top}>
              <div className={styles.imagebox}>
                <Link
                  href={`/blog/${post._id}`}
                  aria-label={`Go to post by ${post.author}`}
                >
                  <Image
                    src={post.image || defaultImage}
                    alt='post image'
                    fill
                    priority
                    className={styles.image}
                  />
                </Link>
                <LikeAPost
                  email={post.email}
                  usersLikedPosts={usersLikedPosts?.likedPosts}
                  postId={String(post._id)}
                  likes={post.likes}
                  isAuth={session?.user ? true : false}
                />
              </div>
              <span className={styles.date}>
                {post.createdAt && typeof post.body.createdAt == "string"
                  ? (post.body.createdAt as string).split("T")[0]
                  : post.body.createdAt.toISOString().split("T")[0]}
              </span>
            </div>
            <CommentsCount numberOfComments={post.comments?.length} />
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
              <Link href={`/blog/${post._id}`}>Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
// user?.author?[0].toUpperCase() + user?.author?.substring(1)
