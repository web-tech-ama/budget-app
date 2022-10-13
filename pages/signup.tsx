import React from 'react';
import {useRouter} from "next/router";
import {useAuth} from "@/context/AuthUserContext";
import Modal from "@/components/ui/modal/modal";
import SignUpForm from "@/components/form/signUpForm";

const Signup = () => {
     const {langJson}=useStore()
    const router = useRouter()
    const {signUp } = useAuth()

    const handelSingUp = async(value:any)=>{
      await signUp(value.email,value.password)

        await router.push('/dashboard')

    }
    return (
        <Modal openModal title={langJson.form.title.RegistrationTitle}>
            <SignUpForm
                handelSubmitForm={handelSingUp}
            />
        </Modal>
    );
};

export default Signup;
