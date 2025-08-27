
import Image from 'next/image'
import Link from 'next/link'
import styles from './blog.module.css'
import { fetchPosts } from '../../lib/db/data'
import { Metadata } from 'next'
import {PostWithDates} from '../../lib/db/data'


const defaultImage = '/pexels-pixabay-157675.jpg' 

// metadata
export const metadata: Metadata = {
  title: "Blog App | Blogs page",
  description: "All Blogs",
};


export default async function Blogs() {
// @ts-ignore
let posts = await fetchPosts();




if(!posts || posts.length == 0) return <h1 style={{textAlign:'center'}}>No posts yet</h1>;

 return (
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
            <p className={styles.author}>By {post.author || 'USER'}</p>
           <Link href={`/blog/${post._id}`}>Read More</Link>
          </div>
        </div>
        ))}
      </div>
    )
  }
       
  
