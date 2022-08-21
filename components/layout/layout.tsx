import NavUi from "@/components/ui/navUI/navUi";
import styles from '@/styles/Home.module.scss'
import React from "react";

export default function Layout({ children }:{children: React.ReactNode}) {
    return (
        <>
            <NavUi/>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>

            </footer>

        </>
    )
}
