import Image from "next/image";
import styles from "./singleBlog.module.css";
import AuthorInfo from "@/components/AuthorInfo/authorInfo";
import { Suspense } from "react";
import { fetchPost } from "@/lib/db/data";
import Comments from "@/components/Comments/commentsSection";
import CommentsSection from "@/components/Comments/commentsSection";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);

  return {
    title: `Blog App | ${post?.title}` || "Blog Post",
  };
}

const singleBlog = async ({ params }: { params: { id: string } }) => {
  let { id } = params;

  let post = await fetchPost(id);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageBox}>
          <Image
            src={post?.image ? post?.image : "/pexels-pixabay-157675.jpg"}
            alt='post image'
            fill
            className={styles.imageboxImg}
          />
        </div>
        <div className={styles.textbox}>
          <h1 className={styles.title}>{post?.title}</h1>
          <div className={styles.authorInfo}>
            {/* USER COMPONENT */}
            <Suspense fallback={<div>Loading...</div>}>
              <AuthorInfo userEmail={post?.email} />
            </Suspense>
            <div>
              <div className={styles.flex}>
                <h4 className={styles.fade}>Created</h4>
                <h5>
                  {post && post.body.createdAt.toISOString().split("T")[0]}
                </h5>
              </div>
            </div>
            {post?.body.updatedAt?.toString() !==
              post?.body.createdAt.toString() && (
              <div>
                <div className={styles.flex} style={{ marginLeft: "5px" }}>
                  <h4 className={styles.fade}>Updated</h4>
                  <h5>
                    {post && post.body.updatedAt?.toISOString().split("T")[0]}
                  </h5>
                </div>
              </div>
            )}
          </div>
          <p className={styles.paragraph}>{post?.body.content}</p>
        </div>
      </div>
      <CommentsSection
        postId={post?._id.toString()}
        userEmail={post?.email}
        comments={post?.comments}
      />
    </>
  );
};

export default singleBlog;
