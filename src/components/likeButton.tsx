"use client";

import Image from "next/image";
import styles from "../app/blog/blog.module.css";
import { useState } from "react";

export default function LikeButton({
  email,
  postId,
  usersLikedPosts,
  likes = null,
}: {
  email: string;
  postId: string;
  usersLikedPosts?: string[] | undefined | boolean;
  likes?: string[] | null;
}) {
  const [liked, setLiked] = useState(
    typeof usersLikedPosts == "boolean"
      ? usersLikedPosts
      : usersLikedPosts?.includes(postId)
  );

  const [numberOflikes, setNumberOflikes] = useState(likes?.length);

  function updateLikedPost(body: {
    liked: boolean;
    email: string;
    postId: string;
  }) {
    setTimeout(() => {
      fetch("/api/likePost", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          console.log("this is response", res);
          return res.json();
        })
        .then(console.log);
    }, 5000);
  }

  function handleLikePost() {
    setLiked((prev) => !prev);
    setNumberOflikes((prev) => {
      if (prev !== undefined && liked) {
        return prev - 1;
      } else if (prev !== undefined) {
        return prev + 1;
      }
    });
    let body = {
      liked: !liked,
      email: email,
      postId: postId,
    };
    updateLikedPost(body);
  }

  return (
    <div className={styles.likeButtonDiv}>
      <div className={styles.likeButton} onClick={handleLikePost}>
        <Image
          src={liked ? "/heartred.png" : "/heartclear.png"}
          fill
          alt='like button'
        />
      </div>
      {likes ? <p>{numberOflikes}</p> : null}
    </div>
  );
}
