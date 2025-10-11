import { New_Rocker } from "next/font/google";

export function generateErrorMessage(error: unknown): string {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }
  return message;
}

export async function checkImageValidity(imageUrl: string) {
  const res = await fetch(imageUrl.trim(), { method: "HEAD" });
  const contentType = res.headers.get("content-type");
  if (!res.ok || !contentType?.startsWith("image/")) {
    console.log("image is not good");
    throw new Error("Something wrong with image link, check or try new one");
  }
}

export function getItemFromLStore(itemName: string): boolean {
  const value = localStorage.getItem(itemName);
  if (value) {
    return JSON.parse(value);
  } else {
    localStorage.setItem(itemName, JSON.stringify(true));
    return true;
  }
}
