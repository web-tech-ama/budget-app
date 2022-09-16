import React, {useEffect} from 'react';
import styles from "@/components/ui/alert/alert.module.scss";
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
    const closeAlert=()=>{
        setIsLeaving(true);
        timeoutId = setTimeout(()=>{
            setIsLeaving(false);
            setIsShown(false);
        },timeout)

    }
    useEffect(()=>{
        setIsShown(true);
        closeAlert()
        return ()=>{
            clearTimeout(timeoutId)
        }
    },[closeAlert, isDefaultShown, timeout, timeoutId])
    const classes =(cls:string,type:string | undefined)=>{
        const arrayClass =[cls ,isLeaving?'leaving':null]
        if (type){
            arrayClass.push(type)
        }
        return arrayClass.join(' ')
    }
    const alertStyle={
        borderBottom: '3px solid',
        color:type =='success' ? '#2ad500':'#c4080f',
        borderColor: type =='success' ? '#2ad500':'#c4080f'
    }
    return (
        isShown &&(
            <div role='alert' style={alertStyle}  className={classes(styles.alert,type)}>
                <div className={styles.alert_container}>
                    <span>{icon}</span>
                    <p>{message}</p>
                </div>

            </div>
        )

    );
};

export default Alert;
