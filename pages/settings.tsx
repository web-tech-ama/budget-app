import React from 'react';
import Head from "next/head";
import styles from 'styles/settings.module.scss'
import UserForm from '@/components/form/userForm'
import { useStore } from '@/context/StroeContext';
import { deleteUser, update } from '@/utils/supabaseClient';
import { useAuth } from '@/context/AuthUserContext';
import {IconParkSolidSuccess} from "@/components/ui/icons/icons";


const Settings = () => {

    const {user, signOut} = useAuth();

    const {userData,alertInfo}=useStore();

    const handleEditProfile = async (value:any) => {
        const user = {
            ...value,
            id : userData[0].id
        }
       await update('user_info', user)
        alertInfo(` La mise à jour de l’utilisateur ${value.firstname} ${value.lastname}, c’est effectué avec succès `,'success',<IconParkSolidSuccess/>,true)
    }

    const handleDeleteProfile = async () => {
        await deleteUser(user.id)
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
