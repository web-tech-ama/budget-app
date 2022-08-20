import React from 'react';
import styles from './modal.module.scss'


 type  ModalProps ={
    children: JSX.Element[] | JSX.Element
    title : string
    openModal: boolean
}

const Modal: React.FC<ModalProps> = ({title,openModal,children}) :JSX.Element | null => {

    return openModal ? (
        <section className={styles.modal}>
            <article className={styles.modal_content}>
                <div className={styles.modal_content_child}>
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
