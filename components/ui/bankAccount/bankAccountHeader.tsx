import React, {useState} from 'react';
import BankAccountCard from "@/components/ui/bankAccount/bankAccountCard";
import {BankAccount} from "@/type/interface";
import styles from './bankAccountHeader.module.scss'
import {MaterialSymbolsLibraryAdd} from "@/components/ui/icons/icons";
import Modal from "@/components/ui/modal/modal";
import BankAccountForm from "@/components/form/bankAccountForm";
import {useAuth} from "@/context/AuthUserContext";
import {insert} from "@/utils/supabaseClient";

interface props {
    data: BankAccount[],
}
const BankAccountHeader = ({data}:props) => {
    const { user } = useAuth()
    const [openModal , setOpenModal]=useState(false)
    const handelOpen =()=>{
        setOpenModal(!openModal)
    }
    const handleSubmit =async(value:BankAccount)=>{
        const budgetInfo :BankAccount={
            name: value.name,
            initial_budget : value.initial_budget,
            actual_budget_of_this_month : value.initial_budget,
            final_budget_of_this_month : value.initial_budget,
            user_id:user.id

        }
        await insert('Bank_account',budgetInfo)
        setOpenModal(false)

    }
    return (
        <div className={styles.bank_account_header}>
            {data?.map(({id,initial_budget,name})=>(
                <BankAccountCard key={id}
                                 initial_budget={initial_budget}
                                 name={name}
                />
            ))

            }
            <button className={styles.bank_account_header_add_btn} onClick={handelOpen}>
                <MaterialSymbolsLibraryAdd/>

            </button>
            <Modal handelClose={handelOpen} close={true} title='Ajouter un compte' openModal={openModal}>
                <BankAccountForm handleSubmitForm={handleSubmit}/>
            </Modal>
        </div>
    );
};

export default BankAccountHeader;
