import { createClient } from '@supabase/supabase-js'

const supaBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supaBaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supaBase = createClient(supaBaseUrl, supaBaseAnonKey)

export const fetchData = async (table:string,columns:string)=>{
    let {data, error}= await supaBase
        .from(table).select(columns)
    if (error) {
        console.log(error.message);
        throw error;
    }
    return data || []
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

