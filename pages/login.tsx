import React from 'react';
import { useRouter } from 'next/router'
import {useAuth} from "@/context/AuthUserContext";
import Modal from "../components/ui/modal/modal";
import LoginForm from "../components/form/loginForm";


const Login = () => {
    const router = useRouter()
    const { user, signIn } = useAuth()
    const handelLogin  = async(value:any)=>{
        await signIn(value.email,value.password)
        await router.push('/dashboard')
    }
    return (
        <Modal openModal title='Budget | Connextion !'>
            <LoginForm handelSubmitForm={handelLogin }/>
        </Modal>


    );
};

export default Login;
