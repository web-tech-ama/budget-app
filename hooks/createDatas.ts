import {  ref, push,set } from "firebase/database";
import {db} from "@/utils/db";
export const useCreateData=() : object=>{

    const writes =(path:string ,data:object )=>{
        const writeRef = ref(db, path);
        const newWriteRef = push(writeRef);
        set(newWriteRef, data).then(r => console.log(r));
    }
    return {
        writes
    }
}
