
import { submitBlogPost } from '@/lib/actions/submitPost'
import styles from './write.module.css'
import Image from 'next/image'
import toast from 'react-hot-toast';
import Form from '@/components/form';


export async function submitFunction(formData:FormData){

  const errorMessage = await submitBlogPost(formData);
  console.log(errorMessage)
  if(errorMessage){
    toast(errorMessage)
  }


}


 function writeBlog() {
  return (
    <>
    <div className={styles.container}>
        <div className={styles.imagebox}>
          <Image src='/creativity.avif' fill alt='hero' className={styles.image}/>
        </div>
        <Form/>
    </div>
    </>
  )
}

export default writeBlog