
import { useRouter } from 'next/router'
import React, { useEffect} from 'react'
import { useAuth } from '@/context/AuthUserContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth()
    const router = useRouter()


    useEffect( () => {

        (async ()=>{
            console.log(user)
            if (!user) {
         await router.push('/login')
            }
        })()

    }, [router, user])

    return <>{user ? children : null}</>
}

export default ProtectedRoute
