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
        <h1 className={styles.title}>We create digital ideas that are bigger,better and bolder.</h1>
        <p className={styles.paragraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam sed saepe iure. Officia recusandae eligendi beatae voluptatibus ad. Molestiae, ipsum.</p>
        <div className={styles.ratings}>
          <div>
            <h1 className={styles.ratingTitle}>10 K+</h1>
            <p className={styles.ratingText}>Years of experience</p>
          </div>
          <div>
            <h1 className={styles.ratingTitle}>10 K+</h1>
            <p className={styles.ratingText}>Years of experience</p>
          </div>
          <div>
            <h1 className={styles.ratingTitle}>10 K+</h1>
            <p className={styles.ratingText}>Years of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imageBox}>
        <Image src='/pexels-ogo-1486213.jpg' alt='' fill className={styles.imageboxImg}/>
      </div>
    </div>
  )
}

export default About