"use client";

import styles from "../app/profile/profile.module.css";
import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal/confirmationModal";
import Image from "next/image";
import EditBtn from "./editBtn";
import DeleteBtn from "./deleteBtn";
import {
  handleDeleteAllPost,
  handleDeletePost,
} from "@/lib/actions/deletePost";
import { PostWithDates } from "@/lib/types";
const defaultImage = "/pexels-pixabay-157675.jpg";

export default function MyBlogs(props: {
  posts: PostWithDates[];
  email: string | undefined;
}) {
  const { posts, email } = props;
  const [openModal, setOpenModal] = useState(false);
  const [idPostDelete, setIdPostDelete] = useState("");

  const handleDelete = async (id?: string) => {
    if (id) {
      await handleDeletePost(id);
    } else {
      // console.log("deleting all post");
      if (email) {
        await handleDeleteAllPost(email);
      }
    }
  };

  if (posts.length == 0) return <h1>No posts yet</h1>;

  return (
    <>
      {openModal && (
        <Modal
          id={idPostDelete}
          handleDelete={handleDelete}
          setOpenModal={setOpenModal}
        />
      )}
      <button
        className={styles.deleteAllBtn}
        onClick={() => {
          setIdPostDelete(""), setOpenModal(true);
        }}
      >
        Delete all post
      </button>

      <div className={styles.container}>
        {posts?.map((post: PostWithDates) => (
          <div className={styles.blog} key={post.title}>
            <div className={styles.top}>
              <DeleteBtn
                id={post._id.toString()}
                setIdPost={setIdPostDelete}
                setOpenModal={setOpenModal}
              />
              <EditBtn id={post._id.toString()} />
              <div className={styles.imagebox}>
                <Link href={`/blog/${post._id}`}>
                  <Image
                    src={post.image || defaultImage}
                    alt='post image'
                    fill
                    priority
                    className={styles.image}
                  />
                </Link>
              </div>
              <span className={styles.date}>
                {typeof post.createdAt == "string"
                  ? post.createdAt.split("T")[0]
                  : post.createdAt.toISOString().split("T")[0]}
              </span>
            </div>
            <div className={styles.textbox}>
              <h2>{post.title}</h2>
              <p className={styles.desc}>
                {post.body.length > 100
                  ? `${post.body.slice(0, 100)}...`
                  : post.body}
              </p>
              <Link href={`/blog/${post._id}`}>Read More </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
