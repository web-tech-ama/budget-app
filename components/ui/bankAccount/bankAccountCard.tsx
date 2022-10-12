import React from 'react';
import styles from './bankAcountCard.module.scss'
import {useStore} from "@/context/StroeContext";
interface BankAccountCardPros {
    initial_budget: number,
    name:string
    account_color:string |undefined
}
const BankAccountCard = ({initial_budget,name,account_color}:BankAccountCardPros) => {
    const {langJson}=useStore()
    const stylesAccount ={
        borderColor:account_color? account_color :'rgba(248, 186, 14, 0.85)'
    }
    return (
        <div>
            <div style={stylesAccount}  className={styles.bank_title}>
                <h4>{langJson.dashboardLabel.account}: {name}</h4>
            </div>
           <section style={stylesAccount} className={styles.bankAccountCard}>
               <h5 className={styles.bank_card_title}>{Number(initial_budget).toFixed(2)} €</h5>
               <p>{langJson.dashboardLabel.revenue}</p>
           </section>
        </div>
    );
};

export default BankAccountCard;
