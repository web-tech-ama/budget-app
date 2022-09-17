import React, {memo, MouseEventHandler, useEffect, useMemo} from 'react';
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/components/ui/input/input";
import styles from "@/components/form/form.module.scss";
import Button from "@/components/ui/button/Button";
import {BankAccount} from "@/type/interface";
import {useStore} from "@/context/StroeContext";


interface FormOperation {
 handleSubmitForm :  SubmitHandler<FieldValues>
    edit?: boolean

    handleDelete?: MouseEventHandler
    id?: number| undefined
}

const BankAccountForm: React.FC<FormOperation> =  ({handleSubmitForm,handleDelete,edit,id}) => {
    const {account}:{account:BankAccount[]}=useStore();

    const { register, handleSubmit ,reset,formState:{errors,isSubmitting}} = useForm({
        mode: "onChange",
        defaultValues : useMemo(()=>{
           if (edit){
               return account.find((v)=>v.id ==id)
           }
        },[account, edit, id])

    });

    useEffect(()=>{
        if (edit){
            reset(account.find((v)=>v.id ==id))
        }

    },[account, edit, id, reset])
    return (
        <>

            <form className={edit ? styles.edit_form : styles.login_form} onSubmit={handleSubmit(handleSubmitForm)}>
                <Input
                    type='text' placeholder="Nom du budget" {...register('name')}
                    error={errors.name?.message}
                />
                <Input
                    type='number' placeholder="Budget Initial " {...register('initial_budget')}
                    error={errors.initial_budget?.message}                />
                <Input type='color' {...register('account_color')}
                       error={errors.account_color?.message}
                />

                <div>
                    <Button disabled={isSubmitting}  text={edit ? 'Modifier' : 'Enregistrer'}></Button>
                    {edit && <Button onClick={handleDelete} color="red" text='Supprimer'></Button>}
                </div>

            </form>
        </>
    );
};

export default memo(BankAccountForm);
