import React from 'react';
import 'chart.js/auto'
import Head from "next/head";

import Modal from "@/components/ui/modal/modal";
import SetupForm from "@/components/form/setupForm";

import BankAccountHeader from "@/components/ui/bankAccount/bankAccountHeader";
import ChartDoughNut from "@/components/ui/chart/chart-doughnut";
import {useStore} from "@/context/StroeContext";
import styles from 'styles/dashboard.module.scss'
import {UpperCase} from "@/utils/upperCase";

const Dashboard = () => {
    const {userData,account,langJson}=useStore()


    return (
        <div>
            <Head>
                <title>{UpperCase(langJson.menu.dashboard)}</title>
            </Head>

            <section className={styles.bank_account_and_chart}>

                {account.length !=0?(
                        <ChartDoughNut />
                    )
                    :
                    null
                }
                <BankAccountHeader data={account}/>
            </section>


            <Modal title='user info' openModal={userData.length !==0?false:true}>
                <SetupForm/>
            </Modal>

        </div>
    );
};

export default Dashboard;

