import NavUi from "@/components/ui/navUI/navUi";
import styles from '@/styles/Home.module.scss'
import React from "react";
import ProfileBare from "@/components/ui/profil/profileBare";

export default function Layout({ children }:{children: React.ReactNode}) {
    return (
        <>
            <NavUi/>
            <ProfileBare/>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>

            </footer>

        </>
    )
}
