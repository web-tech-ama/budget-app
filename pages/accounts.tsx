import React, {memo, useState} from 'react';
import Head from "next/head";
import BankAccountForm from "@/components/form/bankAccountForm";
import {useStore} from "@/context/StroeContext";
import {BankAccount} from "@/type/interface";
import Select from "@/components/ui/select/select";
import Options from "@/components/ui/select/Options";
import styles from "@/styles/accounts.module.scss"


const Accounts = () => {
    const handleSubmit =(valeu:any)=>{
        console.log(valeu)
    }
    const {account}:{account:BankAccount[]}=useStore();
    const [getId ,setGetId]=useState<number|undefined>(0)
    const [isSelect, setIsSelect]= useState<boolean>(false)
    const [inputValue , setInputValue]=useState<string>('')
    const handelSelect =()=>{
        setIsSelect((prevState)=>!prevState)
    }


    return (
        <div className={styles.accounts}>
            <Head>
                <title >Account</title>
            </Head>
            <h1 className={styles.accounts_title}>Account</h1>
            <section className={styles.accounts_card}>

                <Select isSelect={isSelect} inputValue={inputValue} label='Liste des comptes' handelSelect={handelSelect}>
                    {
                        account.map((v)=>(
                            <Options getId={setGetId}  clos={handelSelect} key={v.id} id={v.id} value={v.name +' - '+ v.initial_budget + ' €'} name='bank_account' selectValue={inputValue} inputValue={setInputValue}/>
                        ))
                    }

                </Select>
                <BankAccountForm id={getId}  edit={true} handleSubmitForm={handleSubmit}/>

            </section>
        </div>
    );
};

export default memo(Accounts);
