import React from 'react';
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "@/components/ui/input/input";
import {LoginAndSignUpProps} from "@/components/form/signUpForm";
import styles from './form.module.scss'
import Link from "next/link";
import Button from "@/components/ui/button/Button";
export const LoginSchema  = Yup.object().shape({
    email:Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})
const LoginForm:React.FC<LoginAndSignUpProps>  = ({handelSubmitForm}) => {

    const { register, handleSubmit,formState:{errors,isSubmitting}} = useForm({
        mode: "onChange",
        resolver: yupResolver(LoginSchema)
    });
    return (
        <form className={styles.login_form} onSubmit={handleSubmit(handelSubmitForm)}>
            <Input name="email" type="email" placeholder='Votre e-mail:' {...register('email')}
                   error={errors.email?.message}/>
            <Input name="password" type="password" placeholder='Votre mot de passe:' {...register('password')}
                   error={errors.email?.message}/>
            <Link href='signup'>
                <a >Inscription</a>
            </Link>

            <div>
                <Button disabled={isSubmitting}  text='Connextion'></Button>
            </div>
        </form>
    );
};

export default LoginForm;
