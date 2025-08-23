
import Image from 'next/image'
import styles from './home.module.css'
import Link from 'next/link'
import { auth } from '@/lib/auth'


async function Home() {  
 

  return (
    <div className={styles.container}>
      <div className={styles.textbox}>
        <h1 className={styles.title}>Creative minds agency.</h1>
        <p className={styles.paragraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam sed saepe iure. Officia recusandae eligendi beatae voluptatibus ad. Molestiae, ipsum.</p>
        <div className={styles.buttons}>
          <Link href='/about' style={{cursor:'pointer'}}>
            <button className={styles.button}>Learn More</button>
          </Link>
          <Link className={styles.button} href="/contact">Contact
          </Link>
        </div>
        <div className={styles.banner}>
          <div className={styles.bannerInnerDiv}>
            <Image src='/pexels-evg-kowalievska-1040424.jpg' alt='logo' height={50} width={50}  className={styles.bannerImg}/>
            <Image src='/pexels-evg-kowalievska-1040424.jpg' alt='logo' height={50} width={50} className={styles.bannerImg}/>
            <Image src='/pexels-evg-kowalievska-1040424.jpg' alt='logo' height={50} width={50} className={styles.bannerImg}/>
           
          </div>
        </div>
      </div>
      <div className={styles.imageBox}>
        <Image src='/pexels-evg-kowalievska-1040424.jpg' alt='hero-image' fill className={styles.imageboxImg}/>
      </div>
    </div>
  )
}

export default Home