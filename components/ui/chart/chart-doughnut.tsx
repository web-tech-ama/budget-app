import React from 'react';
import type { NextPage } from 'next'
import {Doughnut} from 'react-chartjs-2';

const ChartDoughnut : NextPage = () => {
    
    const budgetByBankAccount = {
      bankAccountA : {
        name : 'Compte courant',
        Budget : {
          amount : 1500
        }
      },
      bankAccountB : {
        name : 'Livret A',
        Budget : {
          amount : 3000
        }
      },
      bankAccountC : {
        name : 'Compte courant bis',
        Budget : {
          amount : 500
        }
      }
    }
    
    const totalAmount = budgetByBankAccount.bankAccountA.Budget.amount + budgetByBankAccount.bankAccountB.Budget.amount + budgetByBankAccount.bankAccountC.Budget.amount

    const data = {
        labels: [
          budgetByBankAccount.bankAccountA.name,
          budgetByBankAccount.bankAccountB.name,
          budgetByBankAccount.bankAccountC.name
        ],
        datasets: [{
            data: [ 
                budgetByBankAccount.bankAccountA.Budget.amount, 
                budgetByBankAccount.bankAccountB.Budget.amount, 
                budgetByBankAccount.bankAccountC.Budget.amount
            ],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
      };
      return (
        <div className='chart-doughnut'>
            <h2>Budget total : {totalAmount} €</h2>
            <Doughnut
                data={data}
                width={400}
                height={400}
            />
        </div>
      )
}

export default ChartDoughnut;