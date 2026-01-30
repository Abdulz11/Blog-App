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
  const [onUserPostsPage, setOnUserPostsPage] = useState<boolean | null>(null);

  useEffect(() => {
    // console.log(getItemFromLStore("onUserPost"));
    setOnUserPostsPage(getItemFromLStore("onUserPost"));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && onUserPostsPage !== null) {
      console.log(onUserPostsPage);
      localStorage.setItem("onUserPost", JSON.stringify(onUserPostsPage));
    }
  }, [onUserPostsPage]);

  {
    return onUserPostsPage !== null ? (
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
    ) : null;
  }
}
