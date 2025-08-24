import toast from 'react-hot-toast';
import { submitBlogPost } from './submitPost';

export async function submitFunction(formData:FormData){

  const errorMessage = await submitBlogPost(formData);
  
  if(errorMessage){
    toast(errorMessage)
  }


}