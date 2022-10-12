import React from 'react';
import type { NextPage } from 'next'
import {Doughnut} from 'react-chartjs-2';
import {useStore} from "@/context/StroeContext";
import styles from '@/components/ui/chart/chartDoughnut.module.scss'
import {BankAccount} from "@/type/interface";


const ChartDoughnut : NextPage = () => {
    const {account,loading,langJson}:{account:BankAccount[],loading:boolean,langJson:any}=useStore()


    const totalAmount=account?.map((item)=> [Number(item.initial_budget).toFixed(2)]).reduce<any>((accumulate,valeurcourante) =>{
        return Number(accumulate)  + Number(valeurcourante)
    },[] as Number[] )
    const data = {
        labels:account?.map((item)=> [item.name]),
        datasets: [{
            data:account?.map((item)=> [Number(item.initial_budget).toFixed(2)]),
            backgroundColor: account?.map((item):any=> [item.account_color]),
            hoverBackgroundColor: account?.map((item):any=> [item.account_color])
        }]
    };

    return (
          <>
              {loading?(<h2>Loading....</h2>):(
                  <div className={styles.chart_doughnut}>
                      <h2>{langJson.dashboardLabel.totalBudget}: {Number(totalAmount).toFixed(2)} €</h2>
                      <Doughnut
                          data={data}
                          width={90}
                          height={90}
                      />
                  </div>
              )
              }

          </>


      )
}

export default ChartDoughnut;
