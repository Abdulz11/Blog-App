"use client";

import ProfileNavigation from "./profileNavigation";
import { useEffect, useState } from "react";
import MyBlogs from "./myBlogs";
import LikedBlogs from "./likedBlogs";
import { PostWithDates } from "@/lib/types";
import { getItemFromLStore } from "@/lib/utilityFunctions";

export default function ProfileContent(props: {
  likedPostArray: PostWithDates[] | [];
  posts: PostWithDates[] | [];
  email: string | undefined;
}) {
  const { posts, email } = props;
  const [onUserPostsPage, setOnUserPostsPage] = useState<boolean | null>(
    typeof window !== "undefined" && getItemFromLStore("onUserPost")
  );

  useEffect(() => {
    if (typeof onUserPostsPage == "boolean") {
      console.log(onUserPostsPage);
      localStorage.setItem("onUserPost", JSON.stringify(onUserPostsPage));
    }
  }, [onUserPostsPage]);

  return (
    <>
      <ProfileNavigation
        setMyPost={setOnUserPostsPage}
        myPost={onUserPostsPage}
      />
      {onUserPostsPage ? (
        <>
          <h3>{posts.length > 0 && `${posts.length} posts`}</h3>
          <MyBlogs posts={posts} email={email} />
        </>
      ) : (
        <LikedBlogs posts={props.likedPostArray} />
      )}
    </>
  );
}
