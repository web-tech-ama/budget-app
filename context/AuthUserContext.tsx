import React, {createContext, useContext, useEffect, useState} from "react";
import {Session, Subscription, SupabaseClient, User} from "@supabase/supabase-js";

const AuthContext = createContext<any>({ user: null, session: null })

export interface Props {
    supabaseClient: SupabaseClient;
    [propName: string]: any;
    children: React.ReactNode
}
export const AuthContextProvider =({supabaseClient: supabase,children}:Props)=>{

    const [session, setSession] = useState< Session | null>(null)
    const [user, setUser] = useState<  User  | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        (async ()=>{
            const { data:{session} } =  await supabase.auth.getSession()
            setSession(session)
            setUser(session?.user ?? null)
            const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) =>{
                setSession(session)
                setUser(session?.user ?? null)
            })
            setLoading(false)
            return () =>  {
                // @ts-ignore
               authListener.subscription<Subscription>();
            }
        })()

    },[supabase.auth])

    const signUp = async (email: string, password: string)=>{
        const { data, error } = await supabase.auth.signUp({
            email:email,
            password:password
        })
        return {data,error}
    }
    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        return{data,error}

    }
    const signOut =async ()=>{
         const { error } = await supabase.auth.signOut()
        return {error}
    }
    return(
        <AuthContext.Provider value={{ user, signIn, signUp,session,signOut,setUser}}>{loading ? null : children}</AuthContext.Provider>
    )
}

export const useAuth =()=>{
    const context =useContext(AuthContext)
    if (context === undefined) {
        throw new Error(`useAuth must be used within a UserContextProvider.`)
    }
    return context
}
