import React, {createContext, useContext, useEffect, useState} from "react";

import {dataChange, fetchData} from "@/utils/supabaseClient";
import {BankAccount, Userinfo} from "@/type/interface";
import {useAuth} from "@/context/AuthUserContext";
export interface Props{
    children: React.ReactNode
}
const StoreContext = createContext<any>({})
export const StoreContextProvider=({children}:Props)=>{
    const [userData,setUserData]=useState<Userinfo[]>([])
    const [account,setAccount]=useState<BankAccount[]>([])
    const [alerts,setAlerts]=useState<{}>({})
    const [loading, setLoading] = useState(true)
    const {user}=useAuth()

    useEffect(()=>{
        (async ()=>{
            if (user){
                const userinfo=  await fetchData('user_info','*')
                const bank_account = await fetchData('bank_account',`*`)
                setUserData(userinfo)
                setAccount(bank_account)
            }
            setLoading(false)
        })()
    },[user])
    useEffect(()=>{
        dataChange('bank_account','db_changes_account','INSERT',setAccount)
        dataChange('user_info','db_changes_user','INSERT',setUserData)
        dataChange('user_info','db_update_user','UPDATE',setUserData)
    },[])

    const alertInfo=(message:string,type:string,icon:JSX.Element,active:boolean)=>{
        setAlerts({message,type,icon,active})

    }

    return(
        <StoreContext.Provider value={{userData, loading,account,setAccount,setUserData,alerts,alertInfo}} >{loading ? null :children}</StoreContext.Provider>
    )
}
export const useStore =()=>{
    const context =useContext(StoreContext)
    if (context === undefined) {
        throw new Error(`useStore must be used within a StoreContextProvider.`)
    }
    return context
}
