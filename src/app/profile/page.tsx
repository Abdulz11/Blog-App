import styles from "./profile.module.css";
import { fetchLikedPosts, fetchUser } from "../../lib/db/data";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import ProfileContent from "@/components/profileContent";
import { Post } from "@/lib/db/models";
import { PostWithDates, UserWithDates } from "@/lib/types";
import ChangeName from "@/components/changeName";

// metadata
export const metadata: Metadata = {
  title: "Blog App | Profile",
  description: "Profile",
};

export default async function Profile() {
  const session = await auth();
  // @ts-ignore
  let user = await fetchUser(session?.user.email);

  // test
  // let user = (await fetchUser("dullas@gmail.com")) as UserWithDates;
  // console.log(user.author);

  const usersPosts: PostWithDates[] | [] = user?.posts
    ? JSON.parse(JSON.stringify(user?.posts))
    : [];

  // console.log(user);
  const usersLikedPosts: string[] | [] = user?.likedPosts
    ? user?.likedPosts
    : [];
  const likedPost = await fetchLikedPosts(usersLikedPosts);
  const likedPostArray: PostWithDates[] | [] = JSON.parse(
    JSON.stringify(likedPost),
  );

  // if (!usersPosts) return <h1>Something went wrong when fetching posts</h1>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileDiv}>
        <h2>
          {`Hi, ${user?.author || session?.user?.name?.split(" ")[0]}`}
          <ChangeName
            userEmail={user?.email}
            username={user?.username}
            author={user?.author}
          />
        </h2>
      </div>
      <ProfileContent
        likedPostArray={likedPostArray}
        posts={usersPosts}
        email={user?.email}
      />
    </div>
  );
}
