import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'


const supaBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supaBaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// @ts-ignore
export const supaBase = createClient(supaBaseUrl, supaBaseAnonKey)

export const fetchData = async (table:string,columns:string): Promise<any[]>=>{

    let {data, error}= await supaBase
        .from(table).select(columns)
    if (error) {
        console.log(error.message);
        throw error;
    }

    return data || []
}
export const fetchOne = async (table:string,columns:string,column: {  },)=>{

    let {data, error}= await supaBase
        .from(table).select(columns).match(column).single()
    if (error) {
        console.log(error.message);
        throw error;
    }
    return data || {}
}

export const insert=async (table:string,payload:{})=>{
    const { data, error } = await supaBase
        .from(table)
        .insert([
            payload,
        ])
    if (error) {
        console.log(error.message);
        throw error;
    }

    return data ||[]
}
export const update=async (table:string,payload:{})=>{
    const { data, error } = await supaBase
        .from(table)
        .update(
            payload,
        )
    if (error) {
        console.log(error.message);
        throw error;
    }

    return data ||[]
}
export const deleteUser =async (userId:string)=>{
    //console.log(userId);
    
    const { data, error } = await supaBase
        .rpc("deleteUser",userId)
    if (error) {
        console.log(error.message);
        throw error;
    }
}
export const dataChange = (table:string,channel:string,event:string,func:Function)=>{

    const subscription=   supaBase
        .channel(channel)
        .on('postgres_changes', { event: event, schema: 'public',table:table }, (payload:any) => {
            if(event === 'INSERT'){
                func((current:any)=>[...current,payload.new])
            }
            if(event === 'UPDATE'){                
                func((current:any)=>[...current.map((item: { id: any }) => item.id === payload.new.id ? item = payload.new : item )])
            }
            if(event === 'DELETE'){                
                func((current:any)=>[...current.filter((item: { id: any }) => item.id !== payload.new.id)])
            }
        })
        .subscribe()
    return async ()=>{
        await supaBase.removeChannel(subscription)
    }

}
