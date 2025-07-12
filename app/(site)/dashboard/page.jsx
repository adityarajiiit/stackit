'use client'
import { useSession,signOut } from "next-auth/react"
const dashboard=()=>{
    const session=useSession()
    
    if(session.status==="loading"){
        return <div>Loading...</div>
    }
    return(
        <div>
            <h1>Dashboard</h1>
            <p>Status: {session.status}</p>
            
            <p>Hi {session?.data?.user?.email}</p>
            {session?.data?.user?.email && <button onClick={()=>signOut()}>Sign Out</button>}
        </div>
    )
}
export default dashboard