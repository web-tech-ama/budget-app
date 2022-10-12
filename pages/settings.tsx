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
import {UpperCase} from "@/utils/upperCase";


const Settings = () => {

    const {user,setUser} = useAuth();

    const {userData,alertInfo,langJson}=useStore();

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
                <title>{UpperCase(langJson.menu.settings)}</title>
            </Head>
            <h1 className={styles.settings__title}>{UpperCase(langJson.menu.settings)}</h1>
            <section className={styles.settings__profile_info}>
                <h2>{langJson.form.title.profile}</h2>
                <UserForm handleSubmitForm={handleEditProfile} edit updateValues={userData[0]} handleDelete={handleDeleteProfile}/>
            </section>
            <Modal title={langJson.form.message.ask.askSettingTitle} openModal={openModal}>
                <Ask message={langJson.form.message.ask.askDelete}
                    handleCancel={handleCloseModal}
                    handleConfirm={handleConfirm}
                />
            </Modal>
        </div>

    );
};

export default Settings;
