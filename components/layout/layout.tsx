import NavUi from "@/components/ui/navUI/navUi";
import styles from 'styles/Home.module.scss'
import React from "react";
import ProfileBare from "@/components/ui/profile/profileBare";
import Alert from "@/components/ui/alert/alert";
import {useStore} from "@/context/StroeContext";

export default function Layout({ children }:{children: React.ReactNode}) {
    const {alerts}=useStore()

    return (
        <>
            <div className={styles.grid_container}>
                { alerts.active &&(
                    // @ts-ignore
                    <Alert type={alerts.type} message={alerts.message} icon={alerts.icon}/>
                )

                }

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
