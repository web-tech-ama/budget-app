import React, {useCallback, useEffect} from 'react';
import styles from "@/components/ui/alert/alert.module.scss";
import {Classes} from "@/utils/classes";
interface AlertProps {
    message:string
    icon?:any
    type?:string
    isDefaultShown?:boolean
    timeout?:number
}
const Alert = ({message,icon,type,isDefaultShown = false, timeout = 2500}:AlertProps) => {
    const [isShown, setIsShown] = React.useState<boolean>(isDefaultShown);
    const [isLeaving, setIsLeaving] = React.useState<boolean>(false);
    let timeoutId: any = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const closeAlert =useCallback(()=>{
        setIsLeaving(true);
        timeoutId = setTimeout(()=>{
            if (type){
                setIsLeaving(false);
                setIsShown(false);
                sessionStorage.removeItem(type)
            }

        },timeout)

    },[ type,timeoutId])
    useEffect(()=>{
        setIsShown(true);
        closeAlert()
        return ()=>{
            clearTimeout(timeoutId)
        }

    },[closeAlert,isDefaultShown, timeout, timeoutId])
    const arrayClass =[styles.alert ,isLeaving?styles.leaving:null]

    const alertStyle={
        borderBottom: '3px solid',
        color:type =='success' ? '#2ad500':'#c4080f',
        borderColor: type =='success' ? '#2ad500':'#c4080f'
    }
    return (
        isShown &&(
            <div role='alert' style={alertStyle}  className={Classes(arrayClass)}>
                <div className={styles.alert_container}>
                    <span>{icon}</span>
                    <p>{message}</p>
                </div>

            </div>
        )

    );
};

export default Alert;
