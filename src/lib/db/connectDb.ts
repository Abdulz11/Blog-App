import mongoose from "mongoose";
import { Post, User } from "./models";

let connection = {
  isConnected: false,
};
// const testPost = [
//   {
//     author: "dullas",
//     title: "first post",
//     body: "my first post",
//     userEmail: "dullas@gmail.com",
//   },
//   {
//     author: "dullas",
//     title: "second post",
//     body: "my second post",
//     userEmail: "dullas@gmail.com",
//   },
// ];

// username: string;
//   email: string;
//   img?: string;
//   posts?: PostWithDates[];
//   likedPosts?:
// const testUser = {
//   username: "dullas",
//   email: "dullas@gmail.com",
//   img: "",
//   posts: [],
//   likedPosts: [],
// };

export default async function connectToDb() {
  try {
    // @ts-ignore
    if (connection.isConnected) {
      console.log("using existing connection");
      return;
    }
    // console.table(Post.find());

    // console.log(newOne);

    const db = await mongoose.connect(process.env.MONGODBNET!, {
      serverSelectionTimeoutMS: 60000,
    });
    console.log("connected");
    // @ts-ignore
    connection.isConnected = db.connections[0].readyState;
  } catch (e) {
    console.log(e);
    if (typeof e === "string") {
      throw new Error("Something went wrong when connecting to database");
    }
    if (e instanceof Error) {
      // throw new Error(e.message);
      console.log("this is the error instance", e);
      console.log("Error occured when connecting to database");
    }
  }
}
