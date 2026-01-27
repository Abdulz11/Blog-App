import styles from "./commentsSection.module.css";
import Comments from "./comments";
import submitComment from "@/lib/actions/submitComment";
import CommentSectionForm from "../commentSectionForm";
import { auth } from "@/lib/auth";

export default async function CommentsSection(props: {
  postId: string | undefined;
  userEmail: string | undefined;
  comments: { email: string; comment: string }[] | undefined;
}) {
  const session = await auth();
  const isAuth = session?.user?.email ? true : false;

  return (
    <div className={styles.commentSectionContainer}>
      <h2 className={styles.heading}>Comments</h2>
      <div className={styles.commentContainer}>
        {props.comments &&
          props.comments.map((comment: { email: string; comment: string }) => (
            <Comments
              key={comment.comment}
              userEmail={comment.email}
              comment={comment.comment}
            />
          ))}
      </div>
      <CommentSectionForm
        email={props.userEmail}
        postId={props.postId}
        isAuth={isAuth}
      />
    </div>
  );
}
