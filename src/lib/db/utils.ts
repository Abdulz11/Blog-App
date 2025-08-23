import mongoose from "mongoose";

let connection = {
  isConnected: false,
};

export default async function connectToDb() {
  try {
    // @ts-ignore
    if (connection.isConnected) {
      console.log("using existing connection");
      // console.log("users object", await User.find());
      return;
    }
    const db = await mongoose.connect(process.env.MONGODBNET!);
    console.log("connected");
    // console.log(await User.find());

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
