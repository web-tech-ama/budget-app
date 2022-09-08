
import { useRouter } from 'next/router'
import React, {useEffect} from 'react'
import { useAuth } from '@/context/AuthUserContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth()
    const router = useRouter()

    useEffect( () => {

        (async ()=>{

            if (!await user) {
         await router.push('/login')
            }
        })()

    }, [router, user])

    return <>{user ? children : null}</>
}

export default ProtectedRoute
