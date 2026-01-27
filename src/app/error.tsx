"use client";

export default function error(e: unknown) {
  console.log("this is the error now", e);
  return (
    <div>
      <h2 style={{ textAlign: "center" }}> An error occured </h2>
      {e instanceof Error && "message" in e && <p>{e?.message}</p>}
      {typeof e === "string" && <p>{e}</p>}
    </div>
  );
}
