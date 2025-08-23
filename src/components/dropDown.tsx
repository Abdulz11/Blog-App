'use client'

import styles from './Navbar/navbar.module.css'
import { UserContext } from '@/context/userProviderWrapper'
import Image from 'next/image'
import Link from 'next/link'

import { useContext } from 'react'


export default function DropDown(props:any) {
    const {activeLink} = props
    // @ts-ignore
    const {isOpen,setIsOpen,session} = useContext(UserContext)

   

   
    
  return (
    <>
    <div className={styles.menuImageDiv}>
      <Image className={styles.dropdownButton} alt="menu button" src="/menu.png" fill onClick={()=>setIsOpen(true)}/>
    </div>
    {isOpen && <>
     <div  className={styles.dropdown}>
      <div className={styles.closeButtonDiv}>
        <Image className={styles.closeButton} onClick={()=>setIsOpen(false)} alt="close menu button" src="/cross.png" fill/>
      </div>
    <div className={styles.dropdownContainer}>
      <Link href={"/"} className={activeLink('home')}>Home</Link>
      <Link href={"/blog"}className={activeLink('blog')}>Blogs</Link>
      <Link href={"/about"}className={activeLink('about')}>About</Link>
      <Link href={"/write"}className={activeLink('write')}>Write</Link>
      {session && <Link href={"/profile"}className={activeLink('profile')}>Profile</Link>}
    </div>
    </div></>}
     
    </>
  )
}
