import React from 'react';
import { useRouter } from 'next/router'
import {useAuth} from "@/context/AuthUserContext";
import Modal from "../components/ui/modal/modal";
import LoginForm from "../components/form/loginForm";
import {useStore} from "@/context/StroeContext";


const Login = () => {
    //const {langJson}=useStore()
    const router = useRouter()
    const { user, signIn } = useAuth()
    const handelLogin  = async(value:any)=>{
        await signIn(value.email,value.password)
        await router.push('/dashboard')
    }
    return (
        <Modal openModal title='Budget | Connexion !'>
            <LoginForm handelSubmitForm={handelLogin }/>
        </Modal>


    );
};

export default Login;
