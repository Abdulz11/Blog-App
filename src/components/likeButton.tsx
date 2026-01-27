"use client";

import Image from "next/image";
import styles from "../app/blog/blog.module.css";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { likePost } from "@/lib/actions/likePost";

export default function LikeButton({
  email,
  postId,
  usersLikedPosts,
  likes = null,
  isAuth,
  modal,
  setModal,
}: {
  email: string;
  postId: string;
  usersLikedPosts?: string[] | undefined | boolean;
  likes?: string[] | null;
  isAuth: boolean;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [liked, setLiked] = useState(
    typeof usersLikedPosts == "boolean"
      ? usersLikedPosts
      : usersLikedPosts?.includes(postId)
  );

  const [numberOflikes, setNumberOflikes] = useState(likes?.length);

  let timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleLikePost() {
    if (!isAuth) {
      return setModal(true);
    }
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
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

    timeoutId.current = setTimeout(() => {
      likePost(body);
    }, 10000);
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
