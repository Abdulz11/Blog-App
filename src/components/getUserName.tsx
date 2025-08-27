import { User } from "@/lib/db/models"

type getUserProp = {
    email:string
}
export default async function GetUserName(prop:getUserProp) {

    const user = await User.findOne({email:prop.email})
  return (
    <p>By {user?.name}</p>
  )
}
