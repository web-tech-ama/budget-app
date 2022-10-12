import React, {useEffect} from 'react';
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "@/components/ui/input/input";
import {LoginAndSignUpProps} from "@/components/form/signUpForm";
import styles from './form.module.scss'
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import {RiLoginCircleFill} from "@/components/ui/icons/icons";
import {useStore} from "@/context/StroeContext";
let invalid,passwordValidShort,passwordValidMatches,required
export const LoginSchema  = Yup.object().shape({
    email:Yup.string().email(invalid).required(required),
    password: Yup.string().required(required)
        .min(8, passwordValidShort)
        .matches(/[a-zA-Z]/,passwordValidMatches)
})
const LoginForm:React.FC<LoginAndSignUpProps>  = ({handelSubmitForm}) => {
    const {langJson}= useStore()
    useEffect(()=>{
        invalid = langJson.form.message.errors.InvalidEmail
        passwordValidShort = langJson.form.message.errors.passwordShort
        passwordValidMatches = langJson.form.message.errors.passwordMatches
        required = langJson.form.message.errors.required
    },[langJson])


    const { register, handleSubmit,formState:{errors,isSubmitting}} = useForm({
        mode: "onChange",
        resolver: yupResolver(LoginSchema)
    });
    return (
        <form className={styles.login_form} onSubmit={handleSubmit(handelSubmitForm)}>
            <Input  type="email" placeholder={langJson.form.placeholder.loginEmail} {...register('email')}
                   error={errors.email?.message}/>
            <Input  type="password" placeholder={langJson.form.placeholder.loginPassword} {...register('password')}
                   error={errors.password?.message} aria-invalid={true}/>
            <div className={styles.login_form_link}>
                <Link href='signup'>
                    <a >{langJson.form.label.registerLabel}</a>
                </Link>
            </div>


            <div>
                <Button disabled={isSubmitting}  text={langJson.form.label.loginLabel}>
                    <RiLoginCircleFill/>
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
