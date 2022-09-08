import React from 'react';
import * as Yup from "yup";
import Modal from "@/components/ui/modal/modal";
import Input from "@/components/ui/input/input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
interface FormValue{
    email:string
    password: string

}
const LoginSchema  = Yup.object().shape({
    email:Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})
const registerSchema  = LoginSchema.shape({
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'),null],'passwords must match')
})
type LoginProps = {
    handelSubmitForm :SubmitHandler<FieldValues>
    login: boolean
}

const LoginAndRegisterForm:React.FC<LoginProps> = ({handelSubmitForm,login}) => {
    const { register, handleSubmit,formState:{errors,isSubmitting}} = useForm({
        mode: "onChange",
        resolver: yupResolver(LoginSchema)
    });
    return (
        <>
            {login ?(
                <Modal openModal title='Budget | Connextion !'>
                    <form onSubmit={handleSubmit(handelSubmitForm)}>
                        <Input name="email" type="email" placeholder='Votre e-mail:' {...register('email')}
                               error={errors.email?.message}/>
                        <Input name="password" type="password" placeholder='Votre mot de passe:' {...register('password')}
                               error={errors.email?.message}/>
                        <div>
                            <button disabled={isSubmitting} type='submit'>Connextion</button>
                        </div>
                    </form>

                </Modal>
            ):(
                <Modal openModal title='Budget | Inscription !'>
                    <form onSubmit={handleSubmit(handelSubmitForm)}>
                        <Input name="email" type="email" placeholder='Votre e-mail:' {...register('email')}
                               error={errors.email?.message}/>
                        <Input name="password" type="password" placeholder='Votre mot de passe:' {...register('password')}
                               error={errors.password?.message}/>
                        <Input name="password" type="password" placeholder='Confirmer votre mot de passe:' {...register('password')}
                               error={errors.password?.message}/>
                        <div>
                            <button disabled={isSubmitting} type='submit'>Inscription</button>
                        </div>
                    </form>

                </Modal>
            )
            }
        </>


    );
};

export default LoginAndRegisterForm;
