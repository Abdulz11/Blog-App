import styles from "./commentsSection.module.css";
import Comments from "./comments";
import submitComment from "@/lib/actions/submitComment";

export default function CommentsSection(props: {
  postId: string | undefined;
  userEmail: string | undefined;
  comments: { email: string; comment: string }[] | undefined;
}) {
  return (
    <div className={styles.commentSectionContainer}>
      <h2 className={styles.heading}>Comments</h2>
      <div className={styles.commentContainer}>
        {props.comments &&
          props.comments.map((comment: { email: string; comment: string }) => (
            <Comments userEmail={comment.email} comment={comment.comment} />
          ))}
      </div>
      <form className={styles.form} action={submitComment}>
        {/* <input type='text' placeholder='Comment...' /> */}
        <textarea name='comment' id='' placeholder='Comment...' />
        <input type='hidden' value={props.postId} name='postId' />
        <input type='hidden' value={props.userEmail} name='userEmail' />
        <button>Comment</button>
      </form>
    </div>
  );
}
