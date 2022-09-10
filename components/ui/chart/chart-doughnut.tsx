import React from 'react';
import type { NextPage } from 'next'
import {Doughnut} from 'react-chartjs-2';
import {useStore} from "@/context/StroeContext";
import styles from '@/components/ui/chart/chartDoughnut.module.scss'

const ChartDoughnut : NextPage = () => {
    const {account,loading}=useStore()
    const colorgenerate =(data)=>{
        let letters = '0123456789ABCDEF'
        let color ='#'
        color += letters[Math.floor(Math.random() * 16)];
        for (let i = 0; i <data.length ; i++) {
            color += i+3;
        }
        return[color]
    }

    const totalAmount=account?.map((item)=> [item.initial_budget]).reduce((accumulate,valeurcourante)=> Number(accumulate)  + Number(valeurcourante) )
    const data = {
        labels:account?.map((item)=> [item.name]),
        datasets: [{
            data:account?.map((item)=> [item.initial_budget]),
            backgroundColor: colorgenerate(account),
            hoverBackgroundColor: colorgenerate(account)
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
