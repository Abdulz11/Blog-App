import Image from "next/image";
import styles from "./comments.module.css";
import { fetchUser } from "@/lib/db/data";

export default async function Comments(props: {
  userEmail: string;
  comment: string;
}) {
  const userDetails = await fetchUser(props.userEmail);
  console.log(userDetails);

  return (
    <div className={styles.container}>
      <div className={styles.authorInfo}>
        <div className={styles.commentProfileImageContainer}>
          <Image src='/pexels-pixabay-157675.jpg' fill alt='profile-image' />
        </div>
        <p className={styles.authorName}>{userDetails?.username}</p>
      </div>
      <div>
        <p className={styles.comment}>{props.comment}</p>
      </div>
    </div>
  );
}
