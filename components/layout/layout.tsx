import NavUi from "@/components/ui/navUI/navUi";
import styles from 'styles/Home.module.scss'
import React from "react";
import ProfileBare from "@/components/ui/profile/profileBare";

export default function Layout({ children }:{children: React.ReactNode}) {
    return (
        <>
            <div className={styles.grid_container}>
                <NavUi/>
                <ProfileBare/>
                <main className={styles.main}>

                    <div className={styles.container}>
                        { children }
                    </div>


                </main>
                <footer className={styles.footer}>

                </footer>
            </div>


        </>
    )
}
