import { auth } from "@/lib/auth";
import { ReactNode } from "react";
import UserProviderWrapper from "./userProviderWrapper";

export async function UserProvider({children}:{children:ReactNode}){
    const session = await auth();
    return(
        <>
        <UserProviderWrapper session={session}>
            {children}
        </UserProviderWrapper>
        </>
    ) 

}

 