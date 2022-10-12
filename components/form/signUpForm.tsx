import React, {useEffect} from 'react';
import Input from "@/components/ui/input/input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {LoginSchema} from "@/components/form/loginForm";
import styles from "@/components/form/form.module.scss";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import {IcRoundAppRegistration} from "@/components/ui/icons/icons";
import {useStore} from "@/context/StroeContext";

let PasswordConfirmMessage
const registerSchema  = LoginSchema.shape({
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'),null],PasswordConfirmMessage)
})
export type LoginAndSignUpProps = {
    handelSubmitForm :SubmitHandler<FieldValues>
}
const SignUpForm:React.FC<LoginAndSignUpProps> = ({handelSubmitForm}) => {
    const {langJson}= useStore()
    useEffect(()=>{
        PasswordConfirmMessage = langJson.form.message.errors.passwordConfirm
    },[langJson])

    const { register, handleSubmit,formState:{errors,isSubmitting}} = useForm({
        mode: "onChange",
        resolver: yupResolver(registerSchema)
    });

    return (
        <form className={styles.login_form} onSubmit={handleSubmit(handelSubmitForm)}>
            <Input  type="email" placeholder={langJson.form.placeholder.loginEmail} {...register('email')}
                   error={errors.email?.message}/>
            <Input  type="password" placeholder={langJson.form.placeholder.loginPassword}{...register('password')}
                   error={errors.password?.message}/>
            <Input  type="password" placeholder={langJson.form.placeholder.loginPasswordConfirm} {...register('passwordConfirm')}
                   error={errors.passwordConfirm?.message}/>
            <div className={styles.login_form_link}>
                <Link href='login'>
                    <a >{langJson.form.label.loginLabel}</a>
                </Link>
            </div>

            <div>
                <Button disabled={isSubmitting}  text={langJson.form.label.registerLabel}>
                    <IcRoundAppRegistration/>
                </Button>

            </div>
        </form>
    );
};

export default SignUpForm;
