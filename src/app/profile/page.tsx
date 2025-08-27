
import Image from 'next/image'
import Link from 'next/link'
import styles from './profile.module.css'
import { fetchPosts, fetchUser } from '../../lib/db/data'
import { Metadata } from 'next'
import {PostWithDates} from '../../lib/db/data'
import { auth } from '@/lib/auth'


const defaultImage = '/pexels-pixabay-157675.jpg' 

// metadata
export const metadata: Metadata = {
  title: "Blog App | Profile",
  description: "Profile",
};

export default async function Profile() {

const session = await auth()
    // @ts-ignore
 let user = await fetchUser(session?.user.email)
 console.log(session?.user?.email)
const posts = user?.posts

  if(!posts) return <h1>Something went wrong when fetching posts</h1>
  
  if(posts.length == 0 ) return <h1>No posts yet</h1>

 return (
    <>
    <div className={styles.profileContainer}>
    <div className={styles.profileDiv}>
        <h2>{`Hi, ${session?.user?.name?.split(" ")[0]}`}</h2>
    </div>
    <h3>{ posts.length > 0 && `${posts.length} posts`}</h3>
   <div className={styles.container}>
        {posts?.map((post:PostWithDates)=>(
          <div className={styles.blog} key={post.title}>
          <div className={styles.top}>
            <div className={styles.imagebox}>
              <Link href={`/blog/${post._id}`}>
                <Image src={post.image || defaultImage} alt='post image' fill priority className={styles.image}/>
              </Link>
            </div>
            <span className={styles.date}>{post.createdAt.toISOString().split('T')[0]}</span>
          </div>
          <div className={styles.textbox}>
            <h2>
              {post.title}
            </h2>
            <p className={styles.desc}>
            {post.body.length > 100 ? `${post.body.slice(0,100)}...`:post.body}
            </p>
           <Link href={`/blog/${post._id}`}>Read More </Link>
          </div>
        </div>
        ))}
      </div>
      </div>
      </>
    )
  }
       
