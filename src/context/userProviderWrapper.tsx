'use client'
import { createContext, ReactNode, useState } from "react"


export const UserContext = createContext({})

export default function UserProviderWrapper({session,children}:{children:ReactNode,session:any}) {
  const [isOpen,setIsOpen] = useState(false)
  return (
    <UserContext.Provider value={{session,isOpen,setIsOpen}}>
        {children}
    </UserContext.Provider>
  )
}
