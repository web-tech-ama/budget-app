import React from 'react';
import {Controller,  FieldValues, ControllerRenderProps, useForm} from 'react-hook-form';
import styles from '@/components/ui/select/select.module.scss'
import {Classes} from "@/utils/classes";
import {MaterialSymbolsCheckSmallRounded} from "@/components/ui/icons/icons";

interface OptionsProps {
    name:string
    value: string
    inputValue: React.Dispatch<React.SetStateAction<string>>
    selectValue:string
    clos: Function
    id:number |undefined
    getId: React.Dispatch<React.SetStateAction<number|undefined>>
    outputControl?:any
    setFormValue?:any

}
const Options = ({name,value,inputValue,selectValue,clos,id,getId,outputControl,setFormValue}:OptionsProps) => {
   const{control}= useForm()

    const handelSelectChange=(value:string,field: ControllerRenderProps<FieldValues, string>,event: React.MouseEvent<HTMLLIElement, MouseEvent>)=>{
       event.stopPropagation()
        inputValue(value)
        field.value = value

        if(setFormValue){
            setFormValue(name,field.value)
        }
        getId(id)
        clos()
    }
    const styles_option=[styles.option, value === selectValue? styles.option_select :null]

    return (
        <Controller
         name={name}
         control={outputControl? outputControl:control}
         render={({field})=>(
             <>
                 <li onClick={(event)=>handelSelectChange(value,field,event)}  className={Classes(styles_option)} >
                     <span>{value}</span>
                     {value === selectValue ? (<span><MaterialSymbolsCheckSmallRounded/></span>):null}

                 </li>

             </>



         )}
        />
    );
};

export default Options;
