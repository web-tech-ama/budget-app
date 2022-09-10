import { createClient } from '@supabase/supabase-js'



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
export const dataChange = (table:string,channel:string,event:string,func:Function)=>{

    const subscription=   supaBase
        .channel(channel)
        .on('postgres_changes', { event: event, schema: 'public',table:table }, (payload:any) => {
            func((current:any)=>[...current,payload.new])
        })
        .subscribe()
    return async ()=>{
        await supaBase.removeChannel(subscription)
    }

}
