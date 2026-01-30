import { IUser, PostWithDates, UserWithDates } from "../types";
import { Post, User } from "./models";
import connectToDb from "./connectDb";

// fetch all post
export async function fetchPosts(
  email: string,
): Promise<PostWithDates[] | undefined> {
  try {
    await connectToDb();

    let posts;
    if (email) {
      posts = await Post.find<PostWithDates>({ email: email });
    } else {
      posts = await Post.find<PostWithDates>();
    }
    return posts;
  } catch (e) {
    if (typeof e === "string") {
      throw new Error(e);
    }
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong when fetching posts");
  }
}

// fetch single post
export async function fetchPost(id: string): Promise<PostWithDates | null> {
  try {
    await connectToDb();
    const post = await Post.findById<PostWithDates>(id);
    return post;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// fetch user
export async function fetchUser(
  userEmail: string,
): Promise<UserWithDates | null> {
  try {
    await connectToDb();

    const user = await User.findOne({ email: userEmail }).populate("posts");

    return user;
  } catch (err) {
    console.log("this is the error in fetchuser data", err);
    return null;
  }
}

// fetch liked posts
export async function fetchLikedPosts(
  arr: string[] | [],
): Promise<PostWithDates[] | []> {
  if (arr.length == 0) return [];
  let postArray: PostWithDates[] = [];
  for (const id of arr) {
    const post: PostWithDates | null = await Post.findById(id);
    if (post) {
      postArray = [...postArray, post];
    }
  }
  return postArray;
}

// update Post
// export async function updatePost(id: string): Promise<PostWithDates | null> {
//   try {
//     connectToDb();
//     const post = await Post.findByIdAndUpdate(id,{});

//     return post;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }
// delete post
export async function deletePost(id: string) {
  try {
    await connectToDb();

    const post = await Post.findById(id);
    const user = await User.findOneAndUpdate(
      { email: post.email },
      { $pull: { posts: { _id: id } } },
      { new: true },
    );

    const postDeleted = await Post.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
  }
}

// delete all posts
export async function deleteAllPost(email: string) {
  try {
    await connectToDb();
    const user = await User.findOneAndUpdate(
      { email: email },
      { posts: [] },
      { new: true },
    );
    await Post.deleteMany({ email });
  } catch (e) {
    console.log(e);
  }
}
