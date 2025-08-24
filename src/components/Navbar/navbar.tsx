'use client'
import Link from "next/link";
import styles from './navbar.module.css'
import { usePathname } from "next/navigation";

import { useContext } from "react";
import { UserContext } from "@/context/userProviderWrapper";
import DropDown from "../dropDown";
import LogInLogOut from "../logInLogOut";
import Image from "next/image";




export default  function Navbar() {
  const path = usePathname();

  // @ts-ignore
  const {session} = useContext(UserContext)
  
   function activeLink(linkName:string){
    if(path === '/' && linkName == 'home'){
      return styles.active
    }
    if(path === '/' + linkName){
      return styles.active
    }
  }

  
  return (
    <>
    <nav className={styles.container}>
      <div className={styles.logoDiv}>
        <div className={styles.logoImageDiv}>
        <Image fill src='/quill.png' alt='logo'/>
        </div>
        <h1 className={styles.logo}>BLOG</h1>
      </div>
      <div className={styles.linkDiv}>
       <Link href={"/"} className={activeLink('home')}>Home</Link>
       <Link href={"/blog"}className={activeLink('blog')}>Blogs</Link>
       <Link href={"/about"}className={activeLink('about')}>About</Link>
       {session && <Link href={"/write"}className={activeLink('write')}>Write</Link>}
       {session && <Link href={"/profile"}className={activeLink('profile')}>Profile</Link>}
       <DropDown activeLink={activeLink}/>
       <LogInLogOut session={session}/>
      </div>
    </nav>
    </>
    
  )
}

 