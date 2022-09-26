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

    handleDelete?: any
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
        },[])

    });

    useEffect(()=>{
        if (edit){
            reset(account.find((v)=>v.id ==id))
        }

    },[])
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
                </div>

            </form>
            {edit && <Button onClick={() => { handleDelete(id); reset()}} color="red" text='Supprimer'></Button>}

        </>
    );
};

export default memo(BankAccountForm);
