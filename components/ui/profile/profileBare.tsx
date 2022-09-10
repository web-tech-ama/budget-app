import React from 'react';
import styles from './profileBare.module.scss'
import {useAuth} from "@/context/AuthUserContext";
import {RiLoginCircleFill, RiLogoutCircleFill} from "@/components/ui/icons/icons";
import Link from "next/link";
import Profile from "@/components/ui/profile/profile";

const ProfileBare = () => {
    const { user,signOut } = useAuth()
    return (
        <div className={styles.profile_bare}>

        <div className={styles.profile_info}>
            {user?(
                <div>

                    <RiLogoutCircleFill/>
                        <p className={styles.profile_sign_out} onClick={signOut}>Déconnextion</p>
                    <Profile/>
                </div>

            ):(
                <div>
                    <RiLoginCircleFill/>
                    <Link href='/login'>
                        <a className={styles.profile_sign_in} >Connextion</a>
                    </Link>
                </div>



            )

            }

        </div>
        </div>
    );
};

export default ProfileBare;
