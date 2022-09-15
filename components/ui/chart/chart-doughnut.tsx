import React from 'react';
import type { NextPage } from 'next'
import {Doughnut} from 'react-chartjs-2';
import {useStore} from "@/context/StroeContext";
import styles from '@/components/ui/chart/chartDoughnut.module.scss'
import {BankAccount} from "@/type/interface";


const ChartDoughnut : NextPage = () => {
    const {account,loading}:{account:BankAccount[],loading:boolean}=useStore()
  /*  const colorgenerate =(data:BankAccount[])=>{
        let letters = '0123456789ABCDEF'
        let color ='#'
        color += letters[Math.floor(Math.random() * 16)];
        for (let i = 0; i <data.length ; i++) {
            color += i+3;
        }
        return[color]
    }*/

    const totalAmount=account?.map((item)=> [item.initial_budget]).reduce<any>((accumulate,valeurcourante) =>{
        return Number(accumulate)   + Number(valeurcourante)
    },[] as Number[] )
    const data = {
        labels:account?.map((item)=> [item.name]),
        datasets: [{
            data:account?.map((item)=> [item.initial_budget]),
            backgroundColor: account?.map((item):any=> [item.account_color]),
            hoverBackgroundColor: account?.map((item):any=> [item.account_color])
        }]
    };

    return (
          <>
              {loading?(<h2>Loading....</h2>):(
                  <div className={styles.chart_doughnut}>
                      <h2>Budget total : {totalAmount} €</h2>
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
