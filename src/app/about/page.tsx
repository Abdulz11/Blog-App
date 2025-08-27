import Image from 'next/image'
import styles from './about.module.css'
import { Metadata } from 'next';


// metadata
export const metadata: Metadata = {
  title: "Blog App | About page",
  description: "About description",
};
function About() {
  return (
    <div className={styles.container}>
      <div className={styles.textbox}>
        <h3 className={styles.pretitle}>About Agency</h3>
        <h1 className={styles.title}>Unleash your creativity, share your voice.</h1>
        <p className={styles.paragraph}>We see blogging as a canvas where creativity flows freely, giving you the power to inspire, challenge, and connect. Here, your voice isn’t just heard, it’s celebrated.</p>
        <div className={styles.ratings}>
          <div>
            <h1 className={styles.ratingTitle}>B</h1>
            <p className={styles.ratingText}>Bold</p>
          </div>
          <div>
            <h1 className={styles.ratingTitle}>L</h1>
            <p className={styles.ratingText}>Loud</p>
          </div>
          <div>
            <h1 className={styles.ratingTitle}>O</h1>
            <p className={styles.ratingText}>Original</p>
          </div>
          <div>
            <h1 className={styles.ratingTitle}>G</h1>
            <p className={styles.ratingText}>Great</p>
          </div>
        </div>
      </div>
      <div className={styles.imageBox}>
        <Image src='/pexels-ogo-1486213.jpg' alt='' fill className={styles.imageboxImg} priority/>
      </div>
    </div>
  )
}

export default About