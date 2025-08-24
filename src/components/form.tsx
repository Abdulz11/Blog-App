'use client'

import styles from './../app/write/write.module.css'
import { submitFunction } from '@/app/write/page'

export default function Form() {
  return (
    <form className={styles.form} action={submitFunction}>
        <input name="title" placeholder='Title' maxLength={40} required  />
        <input name="image" placeholder='Img-url' />
        <textarea 
        name="body" 
        placeholder='Message' required />
        <button>Submit</button>
    </form>
  )
}
