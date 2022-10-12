import React, {memo, useEffect, useMemo} from 'react';
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/components/ui/input/input";
import styles from "@/components/form/form.module.scss";
import Button from "@/components/ui/button/Button";
import {BankAccount} from "@/type/interface";
import {useStore} from "@/context/StroeContext";
import {
    MaterialSymbolsEditSquareOutlineSharp,
    MaterialSymbolsLibraryAddCheckSharp,
    MdiDelete
} from "@/components/ui/icons/icons";


interface FormOperation {
 handleSubmitForm :  SubmitHandler<FieldValues>
    edit?: boolean

    handleDelete?: any
    id?: number| undefined
}

const BankAccountForm: React.FC<FormOperation> =  ({handleSubmitForm,handleDelete,edit,id}) => {
    const {account,langJson}:{account:BankAccount[],langJson:any}=useStore();

    const { register, handleSubmit ,reset,formState:{errors,isSubmitting}} = useForm({
        mode: "onChange",
        defaultValues : useMemo(()=>{
           if (edit){
               return account.find((v)=>v.id ==id)
           }
        },[edit,account,id])

    });

    useEffect(()=>{
        if (edit){
            reset(account.find((v)=>v.id ==id))
        }

    },[edit, account, id, reset])
    return (
        <>

            <form className={edit ? styles.edit_form : styles.login_form} onSubmit={handleSubmit(handleSubmitForm)}>
                <Input
                    type='text' placeholder={langJson.form.placeholder.budgetName } {...register('name')}
                    error={errors.name?.message}
                />
                <Input
                    type='number' placeholder={langJson.form.placeholder.budgetInitial } {...register('initial_budget')}
                    error={errors.initial_budget?.message}                />
                <Input type='color' {...register('account_color')}
                       error={errors.account_color?.message}
                />

                <div>
                    <Button disabled={isSubmitting}  text={edit ? langJson.form.label.editLabel:langJson.form.label.saveLabel}>
                        {edit?<MaterialSymbolsEditSquareOutlineSharp/>:<MaterialSymbolsLibraryAddCheckSharp/>}
                    </Button>
                </div>

            </form>
            {edit && <Button onClick={() => { handleDelete(id); reset()}} color="red" text={langJson.form.label.deleteLabel }>
                <MdiDelete/>
            </Button>}

        </>
    );
};

export default memo(BankAccountForm);
