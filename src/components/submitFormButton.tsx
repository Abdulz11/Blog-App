import { useFormStatus } from "react-dom";

export default function SubmitFormButton() {
    const {pending} = useFormStatus();

  return (
    
     <button>{pending ? 'Submitting...':'Submit'}</button> 
    
  )
}
