import React from 'react';
import Head from "next/head";
import styles from 'styles/settings.module.scss'
import UserForm from '@/components/form/userForm'
import { useStore } from '@/context/StroeContext';
import { deleteUser, update } from '@/utils/supabaseClient';
import { useAuth } from '@/context/AuthUserContext';


const Settings = () => {

    const {user, signOut} = useAuth();

    const {userData}=useStore();
    
    const handleEditProfile = (value:any) => {
        const user = {
            ...value,
            id : userData[0].id
        }
        update('user_info', user)
    }

    const handleDeleteProfile = () => {
        deleteUser(user.id)
        signOut()
    }
    
    return (
        <div className={styles.settings}>
            <Head>
                <title>Settings</title>
            </Head>
            <h1 className={styles.settings__title}>Settings</h1>
            <section className={styles.settings__profile_info}>
                <h2>Profile</h2>
                <UserForm handleSubmitForm={handleEditProfile} edit updateValues={userData[0]} handleDelete={handleDeleteProfile}/>
            </section>
        </div>

    );
};

export default Settings;
