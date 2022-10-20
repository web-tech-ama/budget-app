import React from 'react';
import Input from "@/components/ui/input/input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/ui/button/Button";
import styles from "@/components/form/form.module.scss";
import {MaterialSymbolsLibraryAddCheckSharp} from "@/components/ui/icons/icons";

interface CategoryProps{
    handleSubmitForm :  SubmitHandler<FieldValues>
}
const CategoryForm = ({handleSubmitForm}:CategoryProps) => {
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm(
        {
            mode:"onChange",

        }
    )
    return (
        <>
            <form className={styles.login_form} onSubmit={handleSubmit(handleSubmitForm)} >
                <Input type='text' placeholder='Votre Categorie:' {...register(('name'))}
                error={errors.name?.message}/>
                <Button disabled={isSubmitting} text='Ajouter'>
                    <MaterialSymbolsLibraryAddCheckSharp/>
                </Button>
            </form>
        </>
    );
};

export default CategoryForm;
