import React from 'react';
import { useRouter } from 'next/router'
import LoginUi from "@/components/ui/loginUi/login";
import {useAuth} from "@/context/AuthUserContext";


const Login = () => {
    const router = useRouter()
    const { user, login } = useAuth()
    const handelLogin  = async(value:any)=>{
        console.log(user)
        try {
           await login(value.email,value.password)
            await router.push('/dashboard')
        }catch (e) {
            console.log(e)
        }


    }
    return (
        <LoginUi handelSubmit={handelLogin}/>

    );
};

export default Login;
