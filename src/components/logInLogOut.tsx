// 'use client'
// import { signIn, signOut } from "@/lib/auth"
import styles from "./Navbar/navbar.module.css"
import { signIn,signOut } from "next-auth/react"


export default  function LogInLogOut(props:any) {
    const {session} = props
    
    // console.log(signIn())

   return <>
   {!session ?<button className={styles.navButton}  onClick={async()=>await signIn('google')}>Log in</button> :
       <button className={styles.navButton} onClick={async()=>await signOut()}>Log Out</button>}
   </>
}
