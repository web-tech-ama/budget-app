import React from 'react';
import styles from './bankAcountCard.module.scss'
interface BankAccountCardPros {
    initial_budget: number,
    name:string
    account_color:string |undefined
}
const BankAccountCard = ({initial_budget,name,account_color}:BankAccountCardPros) => {
    const stylesAccount ={
        borderColor:account_color? account_color :'rgba(248, 186, 14, 0.85)'
    }
    return (
        <div>
            <div style={stylesAccount}  className={styles.bank_title}>
                <h4>Compte: {name}</h4>
            </div>
           <section style={stylesAccount} className={styles.bankAccountCard}>
               <h5 className={styles.bank_card_title}>{initial_budget} €</h5>
               <p>Revenus</p>
           </section>
        </div>
    );
};

export default BankAccountCard;
