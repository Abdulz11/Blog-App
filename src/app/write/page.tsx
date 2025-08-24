

import styles from './write.module.css'
import Image from 'next/image'
import Form from '@/components/form';




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