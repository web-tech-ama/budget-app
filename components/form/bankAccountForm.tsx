import React from 'react';
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/components/ui/input/input";
import styles from "@/components/form/form.module.scss";
import Button from "@/components/ui/button/Button";


interface FormOperation {
 handleSubmitForm :  SubmitHandler<FieldValues>
}

const BankAccountForm: React.FC<FormOperation> = ({handleSubmitForm}) => {
    const { register, handleSubmit,formState:{errors,isSubmitting}} = useForm({
        mode: "onChange",
    });

    return (
        <>
            <form className={styles.login_form} onSubmit={handleSubmit(handleSubmitForm)}>
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
                    <Button text='Enregistrer' disabled={isSubmitting}>

                    </Button>

                </div>

            </form>
        </>
    );
};

export default BankAccountForm;
