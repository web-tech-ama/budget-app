import React from 'react';
import styles from "@/components/ui/input/input.module.scss";
import {FieldError,  FieldErrorsImpl, Merge} from "react-hook-form";

interface input extends React.InputHTMLAttributes<HTMLInputElement>{
    label?:string|undefined
    id?:string|undefined
    error?:   string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    rest?: any
}


const Input =React.forwardRef<HTMLInputElement,input>( ({label,id,error,...rest},ref)=>(
    <>
        { label ?(
            <div className={styles.input}>
                <label htmlFor={id}>
                    <span>{label}</span>
                    <input {...rest} ref={ref} />
                </label>
            </div>

        ):( <div className={styles.input}><input  {...rest} ref={ref} /></div>)

        }

        {// @ts-ignore
            error ? (<div className={styles.input_error}><p>{ error}</p></div>):null}
    </>
))


export default Input
