
import { submitBlogPost } from '@/lib/actions/submitPost'
import styles from './write.module.css'
import Image from 'next/image'


 function writeBlog() {
  return (
    <>
    <div className={styles.container}>
        <div className={styles.imagebox}>
          <Image src='/pexels-pixabay-157675.jpg' fill alt='' className={styles.image}/>
        </div>
        <form className={styles.form} action={submitBlogPost}>
         <input name="title" placeholder='Title' maxLength={40} required  />
         <input name="image" placeholder='Img-url'   />
          <textarea 
          name="body" 
          placeholder='Message' required />
          <button>Submit</button>
        </form>
    </div>
    </>
  )
}

export default writeBlog