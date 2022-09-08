import React from 'react';
import Input from "@/components/ui/input/input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useAuth} from "@/context/AuthUserContext";
import styles from "@/components/form/form.module.scss";
import Button from "@/components/ui/button/Button";
interface FormUser {
    handleSubmitForm :SubmitHandler<FieldValues>
}
const UserForm:React.FC<FormUser> = ({handleSubmitForm}) => {
    const { user } = useAuth()
    const { register, handleSubmit,formState:{errors,isSubmitting}} = useForm({
        mode: "onChange",
    });
    return (
        <>
            <form className={styles.login_form}  onSubmit={handleSubmit(handleSubmitForm)}>
                <Input type='text' placeholder='Votre prénom:' name='firstname'{...register('firstname')}
                       error={errors.firstname?.message}
                />
                <Input type='text' placeholder='Votre non:' name='lastname' {...register('lastname')}
                       error={errors.lastname?.message}
                />
                <Input label='Date de naissance :' labelId='age' id='age' type='date' name='age' {...register('age')}
                       error={errors.age?.message}
                />
                <Input type='email' name='email' {...register('email') } readOnly value={user?.email}
                       error={errors.email?.message}
                />

                <div>
                    <Button disabled={isSubmitting}  text='Suivant'></Button>

                </div>

            </form>
        </>
    );
};

export default UserForm;
