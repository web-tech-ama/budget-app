import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import Select from "@/components/ui/select/select";




const Home: NextPage = () => {

    return (
    <div className={styles.container}>
      <Head>
        <title>Budget APP</title>
        <meta name="description" content="application to manage your budget" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Select label='Select Component'/>

      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Home
