import React, {forwardRef,InputHTMLAttributes} from 'react';
import styles from './input.module.scss'
import {FieldError, FieldErrorsImpl, Merge} from "react-hook-form";
interface input extends InputHTMLAttributes<HTMLInputElement> {
    label? :string|undefined,
    labelId?:string
    error:string|FieldError | Merge<FieldError, FieldErrorsImpl<any>>| undefined
    rest? : {  }
}

// eslint-disable-next-line react/display-name
const Input =forwardRef<HTMLInputElement,input>(({label,labelId, error,...rest }:input,ref)=>{
    // @ts-ignore
    return(
        <>
            { label ?(
                <div className={styles.input}>
                    <label htmlFor={labelId}>
                        <span>{label}</span>
                        <input {...rest} ref={ref} />
                    </label>
                </div>

            ):( <div className={styles.input}><input  {...rest} ref={ref} /></div>)

            }

            {error ? (<div className={styles.input_error}><p>{ error}</p></div>):null}

        </>
    )

})

export default Input;
