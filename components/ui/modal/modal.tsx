import React, {MouseEventHandler} from 'react';
import styles from '@/components/ui/modal/modal.module.scss'
import {IcBaselineClose} from "@/components/ui/icons/icons";


 type  ModalProps ={
    children: JSX.Element[] | JSX.Element
    title : string
    openModal: boolean
     close?:boolean,
     handelClose? :MouseEventHandler
}

const Modal: React.FC<ModalProps> = ({title,openModal,close,handelClose,children}) :JSX.Element | null => {

    return openModal ? (
        <section className={styles.modal}>
            <article className={styles.modal_content}>
                <div className={styles.modal_content_child}>
                    {close ?(
                        <div onClick={handelClose} className={styles.modal_close}>
                            <IcBaselineClose/>
                        </div>
                    ):null
                    }

                    <div className={styles.modal_title}>
                        <h5>{title}</h5>
                    </div>

                    <div className={styles.modal_body}>
                        {children}
                    </div>
                </div>

            </article>
        </section>
    ):null;
};

export default Modal;
