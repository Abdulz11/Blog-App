'use client'

import { submitFunction } from '@/lib/actions/submitPostWrapper'
import styles from './../app/write/write.module.css'



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
