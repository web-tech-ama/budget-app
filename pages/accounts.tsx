import React, {memo, useEffect, useState} from 'react';
import Head from "next/head";
import BankAccountForm from "@/components/form/bankAccountForm";
import {useStore} from "@/context/StroeContext";
import {BankAccount} from "@/type/interface";
import Select from "@/components/ui/select/select";
import Options from "@/components/ui/select/Options";
import styles from "@/styles/accounts.module.scss";
import { update, deleteData } from '@/utils/supabaseClient';
import { IconParkSolidSuccess } from '@/components/ui/icons/icons';
import { useRouter } from 'next/router';
import Modal from '@/components/ui/modal/modal';
import Ask from '@/components/ui/ask/ask';



const Accounts = () => {
    const {account, alertInfo}:{account:BankAccount[], alertInfo:any}=useStore();
    const [getId ,setGetId]=useState<number|undefined>(0)
    const [isSelect, setIsSelect]= useState<boolean>(false)
    const [openModal, setOpenModal]= useState<boolean>(false)
    const [id, setID]= useState<number|null>(null)
    const [inputValue , setInputValue]=useState<string>('')
    const router = useRouter();

    useEffect(()=> {
        
    }, [getId])

    const handleSubmit = async (value:any)=>{
        const accountUpdate = {
            ...value,
            final_budget_of_this_month : value.initial_budget,
            actual_budget_of_this_month : value.initial_budget
        }
        
       await update('bank_account', accountUpdate)
        alertInfo(` La mise à jour du compte ${value.name}, s’est effectué avec succès `,'success',<IconParkSolidSuccess/>,true)
    }

    const handelSelect =()=>{
        setIsSelect((prevState)=>!prevState)
    }

    const handleConfirm =  async() => {
        if(id){
            await deleteData('bank_account', id)
        }
        handleCloseModal()
        alertInfo(` La suppression du compte s’est effectué avec succès `,'success',<IconParkSolidSuccess/>,true)
        setGetId(0)
        setInputValue('')
    }

    const handleCloseModal =() => {
        setOpenModal(!openModal)
    }

    const handleDelete = async (value:number) => {
        handleCloseModal()
        setID(value);
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
                {getId !== 0 ? (<BankAccountForm id={getId}  edit={true} handleSubmitForm={handleSubmit} handleDelete={handleDelete}/>
                 ) : null}

            </section>
            <Modal title="Confirmation de suppression de compte bancaire" openModal={openModal}>
                <Ask message="Etes-vous sur de vouloir supprimer ?" 
                    handleCancel={handleCloseModal} 
                    handleConfirm={handleConfirm}
                />
            </Modal>
        </div>
    );
};

export default Accounts;
