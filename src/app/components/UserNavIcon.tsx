"use client"
import { useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "../Context/store";

 function UserNavigation() {

    const {user} = useAppContext()
    const {openSignIn} = useClerk()

    return(
        <div className="flex justify-center items-center gap-3 text-white">
           {
            user ? (
                <>
                <UserButton
                   
                />
                <h1>{user.fullName}</h1>
               
                </>
            ) : (
                <div className="flex items-center gap-2">
                    <button onClick={() => openSignIn()} className="bg-white text-black  px-4 py-2 rounded cursor-pointer">Sign In</button>
                </div>
            )
           }
        </div>
    )
}

export default UserNavigation