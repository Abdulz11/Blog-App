
import Image from 'next/image'
import styles from './home.module.css'
import Link from 'next/link'


 function Home() {  
 

  return (
    <>
    <div className={styles.container}>
      <div className={styles.textbox}>
        <h1 data-testid='hero-text' className={styles.title}>Share your voice, your story matters.</h1>
        <p className={styles.paragraph}>For all the dreamers, this is your space to express and connect with others who value originality and passion.In words not spoken, but written.</p>
        <div className={styles.buttons}>
          <Link href='/write' style={{cursor:'pointer'}}>
            <button className={styles.button}>Write</button>
          </Link>
          <Link className={styles.button} href="/about">Learn More
          </Link>
        </div>
      </div>
      <div className={styles.imageBox}>
        <Image data-testid="hero-image" src='/pexels-evg-kowalievska-1040424.jpg' alt='hero-image' fill className={styles.imageboxImg} priority/>
      </div>
    </div>
    {/* <div>
      <div className={styles.imageBox}>
        <Image src='/pexels-evg-kowalievska-1040424.jpg' alt='hero-image' fill className={styles.imageboxImg}/>
      </div>
      <div className={styles.textbox}>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam sed saepe iure. Officia recusandae eligendi beatae voluptatibus ad. Molestiae, ipsum.</p>
      </div>
    </div> */}
    </>
  )
}

export default Home