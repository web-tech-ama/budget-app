import React, {memo, useCallback,  useState} from 'react';
import 'chart.js/auto'
import Head from "next/head";

import Modal from "@/components/ui/modal/modal";
import SetupForm from "@/components/form/setupForm";

import BankAccountHeader from "@/components/ui/bankAccount/bankAccountHeader";
import ChartDoughNut from "@/components/ui/chart/chart-doughnut";
import {useStore} from "@/context/StroeContext";
import styles from 'styles/dashboard.module.scss'
import {UpperCase} from "@/utils/upperCase";
import OperationForm from "@/components/form/operationForm";
import Button from "@/components/ui/button/Button";
import Select from "@/components/ui/select/select";
import Options from "@/components/ui/select/Options";

import {BankAccount, Category, Operation, Userinfo} from "@/type/interface";
import {insert, update} from "@/utils/supabaseClient";
import OperationTable from "@/components/ui/operation/operationTable";
import OperationItem from "@/components/ui/operation/operationItem";

const Dashboard = () => {

    const {operation,userData,account, alertInfo,langJson,category}:{operation:Operation[],userData:Userinfo[],account:BankAccount[], alertInfo:any,langJson:any,category:Category[]}=useStore();
    const [getId ,setGetId]=useState<number|undefined>(0)
    const [isSelect, setIsSelect]= useState<boolean>(false)
    const [inputValue , setInputValue]=useState<string>('')
    const [getCategoryId ,setCategoryGetId]=useState<number|undefined>(0)
    const [openModal, setOpenModal]=useState<boolean>(false)

    const parsOperation=():Operation[]=>{
        let operations:Operation[]=[]
        for (let i = 0; i < operation.length; i++) {
            for (let j = 0; j < account.length; j++) {
                for (let k = 0; k < category.length; k++) {
                    if(operation[i].bank_account_id === account[j].id && operation[i].category_id === category[k].id ){
                        // @ts-ignore
                        operations.push({...operation[i], bank_account:account[j],category:category[k]})
                    }

                }

            }
        }

        return operations
    }

    const handleModal =() => {
        setOpenModal(!openModal)
    }
    const handleSubmit= useCallback(async (value: Operation)=>{

        const operation:Operation={
            ...value,
            category_id:getCategoryId,
            operation_date:new Date(),
            increment_and_decrement: value.operation_type =='revenu' ? true : false,
            bank_account_id:getId


        }
        let acc = account.find((v)=>v.id == getId)
        let newAmount=value.operation_type =='revenu' ? Number(value.amount)+ Number(acc?.initial_budget):Number(acc?.initial_budget)-Number(value.amount)
        const newAccount ={
            ...acc,
            initial_budget : newAmount,
            actual_budget_of_this_month :newAmount,
            final_budget_of_this_month : newAmount,
        }

        await insert('operation',operation)
        await update('bank_account',newAccount)
        handleModal()
    },[getId,account,getCategoryId])


    const handelSelect =()=>{
        setIsSelect((prevState)=>!prevState)
    }

    return (
        <div>
            <Head>
                <title>{UpperCase(langJson.menu.dashboard)}</title>
            </Head>
            <section className={styles.section_bg}>
                <div className={styles.title_center}>
                    <h1>{UpperCase(langJson.menu.dashboard)}</h1>
                    <div  className={styles.button_section}>
                        <Button onClick={handleModal} text="New Tansfer"></Button>
                        <Button onClick={handleModal} text="New Operation"></Button>
                    </div>
                </div>

            </section>

            <section className={styles.bank_account_and_chart}>

                {account.length !=0?(
                        <ChartDoughNut />
                    )
                    :
                    null
                }
                <BankAccountHeader data={account}/>
            </section>
            <section className={styles.operation_main}>
                <div>
                    <h1>Graphe</h1>
                </div>
                <div className={styles.operation_card}>
                    <OperationTable>
                        {parsOperation().map((item)=>(
                            <OperationItem  key={item.id}{...item}/>
                        ))}
                    </OperationTable>
                </div>
            </section>
            <Modal title='New Operation' close handelClose={handleModal} openModal={openModal}>
                <>
                    <div>
                        <Select isSelect={isSelect} inputValue={inputValue} label={langJson.form.label.accountListLabel} handelSelect={handelSelect}>
                            {
                                account.map((v)=>(
                                    <Options getId={setGetId}  clos={handelSelect} key={v.id} id={v.id} value={v.name +' - '+ v.initial_budget + ' €'} name='bank_account' selectValue={inputValue} inputValue={setInputValue}/>
                                ))
                            }

                        </Select>
                        {getId !== 0 ? ( <OperationForm  setId={setCategoryGetId} handleSubmitForm={handleSubmit} />) : null}

                    </div>

                </>


            </Modal>


            <Modal title={langJson.form.title.userInfo} openModal={userData.length !==0?false:true}>
                <SetupForm/>
            </Modal>

        </div>
    );
};

export default memo(Dashboard) ;

