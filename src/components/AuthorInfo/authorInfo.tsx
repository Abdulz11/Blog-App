import { fetchUser } from "@/lib/db/data";
import styles from "../../app/blog/[id]/singleBlog.module.css";
import Image from "next/image";

type Props = {
  userEmail: string | undefined;
};

async function AuthorInfo({ userEmail }: Props) {
  if (!userEmail) {
    return "User Not Found";
  }
  const user = await fetchUser(userEmail);

  return (
    <>
      <div className={styles.authorimagebox}>
        {/* @ts-ignore */}
        <Image
          src={user?.img || "/pexels-ogo-1486213.jpg"}
          alt='userimage'
          fill
          className={styles.smallimage}
        />
      </div>
      <div>
        <div className={`${styles.flex} ${styles.author}`}>
          <h4 className={styles.fade}>Author</h4>
          <h5>{user?.author ? user?.author : user?.username}</h5>
        </div>
      </div>
    </>
  );
}

export default AuthorInfo;
