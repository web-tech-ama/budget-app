import React from 'react';
import Input from "@/components/ui/input/input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {LoginSchema} from "@/components/form/loginForm";
import styles from "@/components/form/form.module.scss";
import Button from "@/components/ui/button/Button";
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
            <Input name="email" type="email" placeholder='Votre e-mail:' {...register('email')}
                   error={errors.email?.message}/>
            <Input name="password" type="password" placeholder='Votre mot de passe:' {...register('password')}
                   error={errors.password?.message}/>
            <Input name="password" type="password" placeholder='Confirmer votre mot de passe:' {...register('password')}
                   error={errors.password?.message}/>
            <div>
                <Button disabled={isSubmitting}  text='Inscription'></Button>

            </div>
        </form>
    );
};

export default SignUpForm;
