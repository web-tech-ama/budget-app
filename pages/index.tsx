import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import {Budget} from '../type/budget'
import 'chart.js/auto'
import ChartDoughNut from '../components/ui/chart/chart-doughnut'



const Home: NextPage = () => { 

    return (
    <div className={styles.container}>
      <Head>
        <title>Budget APP</title>
        <meta name="description" content="application to manage your budget" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ChartDoughNut />
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Home
