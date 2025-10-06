import styles from "./profile.module.css";
import { fetchLikedPosts, fetchUser } from "../../lib/db/data";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import ProfileContent from "@/components/profileContent";
import { Post } from "@/lib/db/models";
import { PostWithDates, UserWithDates } from "@/lib/types";

// metadata
export const metadata: Metadata = {
  title: "Blog App | Profile",
  description: "Profile",
};

export default async function Profile() {
  const session = await auth();
  // @ts-ignore
  let user = await fetchUser(session?.user.email);
  //  console.log(session?.user?.email)

  // test
  // let user = (await fetchUser("dullas@gmail.com")) as UserWithDates;

  const usersPosts = JSON.parse(JSON.stringify(user?.posts));
  const usersLikedPosts = user?.likedPosts as string[];

  const likedPost = await fetchLikedPosts(usersLikedPosts);
  const likedPostArray = JSON.parse(JSON.stringify(likedPost));

  if (!usersPosts) return <h1>Something went wrong when fetching posts</h1>;

  if (usersPosts.length == 0) return <h1>No posts yet</h1>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileDiv}>
        <h2>{`Hi, ${session?.user?.name?.split(" ")[0]}`}</h2>
      </div>
      <ProfileContent
        likedPostArray={likedPostArray}
        posts={usersPosts}
        email={user?.email}
      />
    </div>
  );
}
