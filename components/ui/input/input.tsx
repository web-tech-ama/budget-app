import React from 'react';
import styles from "@/components/ui/input/input.module.scss";
type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
    >;
interface input extends InputProps{
    label?:string|undefined
    id?:string|undefined
    error?: any| undefined
    rest: React.InputHTMLAttributes<HTMLInputElement>
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
        {error ? (<div className={styles.input_error}><p>{ error}</p></div>):null}
    </>
))


export default Input
