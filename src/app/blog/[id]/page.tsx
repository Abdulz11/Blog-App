import Image from 'next/image'
import styles from './singleBlog.module.css'
import AuthorInfo from '@/components/AuthorInfo/authorInfo'
import { Suspense } from 'react'
import { fetchPost } from '@/lib/db/data'
import { Metadata } from 'next'
import { ObjectId } from 'mongoose'







const singleBlog = async ({params}:{params:{id:string}})=> {
  let {id} = params
console.log(id)
  let post = await fetchPost(id);
  console.log(post)
  

  

  return (
    <div className={styles.container}>
       <div className={styles.imageBox}>
        <Image src={post?.image ? post?.image : "/pexels-pixabay-157675.jpg"} alt='post image' fill className={styles.imageboxImg}/>
      </div>
      <div className={styles.textbox}>
          <h1 className={styles.title}>{post?.title}</h1>
          <div className={styles.authorInfo}>
            {/* USER COMPONENT */}
            <Suspense fallback={<div>Loading...</div>}>
              <AuthorInfo userEmail ={post?.userEmail}/>
            </Suspense>
            <div>
              <div className={styles.flex}>
                <h4 className={styles.fade}>Date</h4>
          
                <h5>{post?.createdAt.toISOString().split('T')[0]}</h5>
              </div>
            </div>
          </div>
        <p className={styles.paragraph}>{post?.body}</p>
      </div>
     
    </div>
  )
}

export default singleBlog