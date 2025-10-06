"use client";

import { signIn } from "next-auth/react";
import styles from "./signIn.module.css";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  return (
    <div className={styles.container}>
      <div className={styles.bgVideoContainer}>
        <video autoPlay loop muted playsInline>
          <source
            src='/loginVideoBgtiny.mp4'
            type='video/mp4'
            media='(min-width:500px)'
          />
          <source
            src='/loginVideoBgsmall.mp4'
            type='video/mp4'
            media='(max-width:500px)'
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.overlay}></div>
      <div className={styles.buttonDiv}>
        <button
          onClick={() =>
            signIn("google", { redirectTo: callbackUrl as string })
          }
        >
          <span className={styles.logoContainer}>
            <Image src='/google.png' alt='google logo' fill />
          </span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
