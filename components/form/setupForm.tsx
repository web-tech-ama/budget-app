import React, {useState} from 'react';
import UserForm from "@/components/form/userForm";
import BankAccountForm from "@/components/form/bankAccountForm";
import {BankAccount} from "@/type/interface";
import {useAuth} from "@/context/AuthUserContext";
import {insert, insertBankAccount, insertUser} from "@/utils/supabaseClient";


const SetupForm = () => {
    const { user } = useAuth()
    const[step , setStep]=useState(1)
    const [userInfo,setUserInfo]=useState({})
    const handelChangeStep =(value:any)=>{
        setStep(step+1)
        setUserInfo(value)

    }
    const handleSubmit = async (value:any)=>{
        const userValue ={
            ...userInfo,
            user_id:user.id
        }
        const budgetInfo :BankAccount={
            name: value.name,
            initial_budget : value.initial_budget,
            actual_budget_of_this_month : value.initial_budget,
            final_budget_of_this_month : value.initial_budget,
            user_id:user.id

        }
        await insert('User',userValue)
        await insert('Bank_account',budgetInfo)

    }
    const Switch =(params:number)=>{
        switch (params) {
            case 1:
                return <UserForm handleSubmitForm={handelChangeStep}/>
            case 2 :
                return  <BankAccountForm handleSubmitForm={handleSubmit}/>

        }
    }

    return (
        <>
            {
                Switch(step)
            }
        </>
    );
};

export default SetupForm;
