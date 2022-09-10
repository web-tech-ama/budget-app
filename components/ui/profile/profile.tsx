import React from 'react';

import styles from '@/components/ui/profile/profile.module.scss'
import {useStore} from "@/context/StroeContext";

const Profile = () => {
    const {userData}=useStore()
    return (
        <>
            {userData.length !=0 ? (
                <div className={styles.profile}>
                  <h4>{
                      userData?.at(0).firstname.toUpperCase().at(0)}{userData?.at(0).lastname.toUpperCase().at(0)}</h4>
                </div>
            ):null

            }

        </>
    );
};

export default Profile;
