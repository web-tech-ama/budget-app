import React from 'react';
import Input from "@/components/ui/input/input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {LoginSchema} from "@/components/form/loginForm";
import styles from "@/components/form/form.module.scss";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import {IcRoundAppRegistration} from "@/components/ui/icons/icons";
const registerSchema  = LoginSchema.shape({
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'),null],'passwords must match')
})
export type LoginAndSignUpProps = {
    handelSubmitForm :SubmitHandler<FieldValues>
}
const SignUpForm:React.FC<LoginAndSignUpProps> = ({handelSubmitForm}) => {
    const { register, handleSubmit,formState:{errors,isSubmitting}} = useForm({
        mode: "onChange",
        resolver: yupResolver(registerSchema)
    });

    return (
        <form className={styles.login_form} onSubmit={handleSubmit(handelSubmitForm)}>
            <Input  type="email" placeholder='Votre e-mail:' {...register('email')}
                   error={errors.email?.message}/>
            <Input  type="password" placeholder='Votre mot de passe:' {...register('password')}
                   error={errors.password?.message}/>
            <Input  type="password" placeholder='Confirmer votre mot de passe:' {...register('passwordConfirm')}
                   error={errors.passwordConfirm?.message}/>
            <div className={styles.login_form_link}>
                <Link href='login'>
                    <a >Connexion</a>
                </Link>
            </div>

            <div>
                <Button disabled={isSubmitting}  text='Inscription'>
                    <IcRoundAppRegistration/>
                </Button>

            </div>
        </form>
    );
};

export default SignUpForm;
