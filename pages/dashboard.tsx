import React from 'react';
import Head from "next/head";

import {useAuth} from "@/context/AuthUserContext";

import Modal from "../components/ui/modal/modal";

import {GetStaticPropsResult} from "next";
import {fetchData} from "@/utils/supabaseClient";
import SetupForm from "@/components/form/setupForm";
import {BankAccount} from "@/type/interface";
import BankAccountHeader from "@/components/ui/bankAccount/bankAccountHeader";
interface Props {
    userinfo: [];
    bank_account:BankAccount[]
}
const Dashboard = ({userinfo,bank_account}:Props) => {
    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>


            <BankAccountHeader data={bank_account}/>
            <Modal title='user info' openModal={userinfo.length !=0?false:true}>
                <SetupForm/>
            </Modal>

        </div>
    );
};

export default Dashboard;

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
    const userinfo = await fetchData('User','*')
    const bank_account = await fetchData('Bank_account',`*other_table (
      user_id
    )`)
    return {
        props: {
            userinfo,
            bank_account
        },
        revalidate: 60,
    };
}
