"use server";

import { User } from "../db/models";

export async function changeName(data: FormData) {
  let { author, email } = Object.fromEntries(data.entries());
  await User.updateOne({ email }, { $set: { author } });
}
