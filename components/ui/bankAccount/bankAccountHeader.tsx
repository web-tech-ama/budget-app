import React, {useState} from 'react';
import BankAccountCard from "@/components/ui/bankAccount/bankAccountCard";
import {BankAccount} from "@/type/interface";
import styles from './bankAccountHeader.module.scss'
import {IconParkSolidSuccess, MaterialSymbolsLibraryAdd} from "@/components/ui/icons/icons";
import Modal from "@/components/ui/modal/modal";
import BankAccountForm from "@/components/form/bankAccountForm";
import {useAuth} from "@/context/AuthUserContext";
import {insert} from "@/utils/supabaseClient";
import {useStore} from "@/context/StroeContext";

interface props  {
    data: BankAccount[],
}

const BankAccountHeader = ({data}:props) => {
    const {alertInfo,langJson}=useStore()
    const { user } = useAuth()
    const [openModal , setOpenModal]=useState(false)
    const handelOpen =()=>{
        setOpenModal(!openModal)
    }
    const handleSubmit =async(value:any)=>{
        const budgetInfo :BankAccount={
            name: value.name,
            initial_budget : value.initial_budget,
            actual_budget_of_this_month : value.initial_budget,
            final_budget_of_this_month : value.initial_budget,
            account_color: value.account_color,
            user_id:user.id

        }
        await insert('bank_account',budgetInfo)
        setOpenModal(false)
        alertInfo(`${langJson.form.message.success.alertAddAccountPart1} ${value.name} ${langJson.form.message.success.alertAddAccountPart2}`,'success',<IconParkSolidSuccess/>,true)

    }
    return (
        < >
            <div className={styles.bank_account_header}>
                {data?.map(({id,initial_budget,name,account_color})=>(
                    <BankAccountCard key={id}
                                     initial_budget={initial_budget}
                                     account_color={account_color}
                                     name={name}
                    />
                ))

                }
                <div className={styles.bank_account_section_btn}>
                    <button className={styles.bank_account_header_add_btn} onClick={handelOpen}>
                        <MaterialSymbolsLibraryAdd/>

                    </button>
                </div>
            </div>


            <Modal handelClose={handelOpen} close={true} title={langJson.form.title.addAccountTitle } openModal={openModal}>
                <BankAccountForm handleSubmitForm={handleSubmit}/>
            </Modal>
        </>
    );
};

export default BankAccountHeader;
