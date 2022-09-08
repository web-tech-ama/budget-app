import React from 'react';
import styles from './bankAcountCard.module.scss'

const BankAccountCard = ({initial_budget,name}) => {
    return (
        <div>
            <div className={styles.bank_title}>

                <h4>Compte: {name}</h4>
            </div>
           <section className={styles.bankAccountCard}>
               <h5 className={styles.bank_card_title}>{initial_budget} €</h5>
               <p>Revenus</p>
           </section>
        </div>
    );
};

export default BankAccountCard;
