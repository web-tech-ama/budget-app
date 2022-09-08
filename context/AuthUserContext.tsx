import React, {createContext, useContext, useEffect, useState} from "react";
import {SupabaseClient} from "@supabase/supabase-js";

const AuthContext = createContext<any>({ user: null, session: null })

export interface Props {
    supabaseClient: SupabaseClient;
    [propName: string]: any;
    children: React.ReactNode
}
export const AuthContextProvider =({supabaseClient: supabase,children}:Props)=>{

    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        (async ()=>{
            const { data:{session}, error } =  await supabase.auth.getSession()
            setSession(session)
            setUser(session?.user ?? null)
            const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) =>{
                setSession(session)
                setUser(session?.user ?? null)
            })
            setLoading(false)
            return () => {
                authListener.subscription()
            }
        })()

    },[])

    const signUp = async (email: string, password: string)=>{
        const { data, error } = await supabase.auth.signUp({
            email:email,
            password:password
        })
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
    }
    return(
        <AuthContext.Provider value={{ user, signIn, signUp,session,signOut }}>{loading ? null : children}</AuthContext.Provider>
    )
}

export const useAuth =()=>{
    const context =useContext(AuthContext)
    if (context === undefined) {
        throw new Error(`useAuth must be used within a UserContextProvider.`)
    }
    return context
}
