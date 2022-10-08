import React, { useState } from 'react';
import Head from "next/head";
import styles from 'styles/settings.module.scss'
import UserForm from '@/components/form/userForm'
import { useStore } from '@/context/StroeContext';
import { deleteUser, update } from '@/utils/supabaseClient';
import { useAuth } from '@/context/AuthUserContext';
import {IconParkSolidSuccess} from "@/components/ui/icons/icons";
import Modal from '@/components/ui/modal/modal';
import Ask from '@/components/ui/ask/ask';


const Settings = () => {

    const {user,setUser} = useAuth();

    const {userData,alertInfo}=useStore();

    const [openModal, setOpenModal]= useState<boolean>(false)

    const handleEditProfile = async (value:any) => {
        const user = {
            ...value,
            id : userData[0].id
        }
       await update('user_info', user)
        alertInfo(` La mise à jour de l’utilisateur ${value.firstname} ${value.lastname}, c’est effectué avec succès `,'success',<IconParkSolidSuccess/>,true)
    }

    const handleConfirm =  async() => {
        await deleteUser(user.id)
        handleCloseModal()
        setUser(null)

    }

    const handleCloseModal =() => {
        setOpenModal(!openModal)
    }

    const handleDeleteProfile = async () => {
        handleCloseModal()
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
            <Modal title="Confirmation de suppression de compte utilisateur" openModal={openModal}>
                <Ask message="Etes-vous sur de vouloir supprimer ?"
                    handleCancel={handleCloseModal}
                    handleConfirm={handleConfirm}
                />
            </Modal>
        </div>

    );
};

export default Settings;
