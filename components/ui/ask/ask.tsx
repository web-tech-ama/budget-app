import { MouseEventHandler } from "react";
import Button from "../button/Button";
import styles from "@/components/ui/ask/ask.module.scss";
import { MaterialSymbolsWarningRounded } from "../icons/icons";

type  AskProps ={
    message : string
    handleConfirm: MouseEventHandler<HTMLButtonElement>
    handleCancel: MouseEventHandler<HTMLButtonElement>
}

const Ask = ({message, handleConfirm, handleCancel }:AskProps) => {
    return (
        <>
        <div className={styles.ask}>
            <div className={styles.ask__icon}>
                <MaterialSymbolsWarningRounded />
            </div>
            <div className={styles.ask__title}>
                <h3>{message}</h3>
            </div>
            <div className={styles.ask__actions}>
                <Button text="Oui" onClick={handleConfirm}></Button>
                <Button text="Non" color="red" onClick={handleCancel}></Button>
            </div>
            
        </div>
        </>
    )
}

export default Ask;