import React from 'react';
import styles from './profileBare.module.scss'
import {useAuth} from "@/context/AuthUserContext";
import {RiLogoutCircleFill} from "@/components/ui/icons/icons";
import Link from "next/link";

const ProfileBare = () => {
    const { user,signOut } = useAuth()
    return (
        <div className={styles.profile_bare}>

        <div className={styles.profile_info}>
            {user?(
                <div>
                    <RiLogoutCircleFill/>
                        <p onClick={signOut}>Déconnextion</p>

                </div>

            ):(
                <Link href='/login'>
                    <a href="">Connextion</a>
                </Link>


            )

            }

        </div>
        </div>
    );
};

export default ProfileBare;
