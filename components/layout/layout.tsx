import NavUi from "@/components/ui/navUI/navUi";
import styles from 'styles/Home.module.scss'
import React from "react";
import ProfileBare from "@/components/ui/profile/profileBare";
import Alert from "@/components/ui/alert/alert";
import {useStore} from "@/context/StroeContext";

export default function Layout({ children }:{children: React.ReactNode}) {
    const {alerts}=useStore()
    const getSessionAlert=()=>{
       const alt = sessionStorage.getItem(alerts.type)
        if (alt){
            return JSON.parse(alt)
        }
    }


    return (
        <>
            <div className={styles.grid_container}>

                { getSessionAlert()?.active &&(
                    // @ts-ignore
                    <Alert type={getSessionAlert().type} message={getSessionAlert().message} icon={alerts.icon}/>
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
