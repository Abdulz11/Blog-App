"use client";
import { useState } from "react";
import LikeButton from "./likeButton";
import LoginInModal from "./Modal/logInModal";

function LikeAPost({
  email,
  postId,
  usersLikedPosts,
  likes = null,
  isAuth,
}: {
  email: string;
  postId: string;
  usersLikedPosts?: string[] | undefined | boolean;
  likes?: string[] | null;
  isAuth: boolean;
}) {
  const [modal, setModal] = useState(false);
  return (
    <>
      {modal && (
        <LoginInModal message={"Log in to like a post"} setModal={setModal} />
      )}
      <LikeButton
        email={email}
        usersLikedPosts={usersLikedPosts}
        postId={String(postId)}
        likes={likes}
        isAuth={isAuth}
        modal={modal}
        setModal={setModal}
      />
    </>
  );
}

export default LikeAPost;
