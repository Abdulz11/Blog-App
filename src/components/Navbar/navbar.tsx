'use client'
import Link from "next/link";
import styles from './navbar.module.css'
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useContext } from "react";
import { UserContext } from "@/context/userProviderWrapper";
import DropDown from "../dropDown";
import LogInLogOut from "../logInLogOut";




export default  function Navbar() {
  const [openMenu,setOpenMenu] = useState(false)
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
      <h1 className={styles.logo}>BLOG</h1>
      <div className={styles.linkDiv}>
       <Link href={"/"} className={activeLink('home')}>Home</Link>
       <Link href={"/blog"}className={activeLink('blog')}>Blogs</Link>
       <Link href={"/about"}className={activeLink('about')}>About</Link>
       <Link href={"/write"}className={activeLink('write')}>Write</Link>
       {session && <Link href={"/profile"}className={activeLink('profile')}>Profile</Link>}
       <DropDown activeLink={activeLink}/>
       <LogInLogOut session={session}/>
      </div>

     
    </nav>
    </>
    
  )
}

 