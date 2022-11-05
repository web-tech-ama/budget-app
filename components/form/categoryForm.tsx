import React from 'react';
import Input from "@/components/ui/input/input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/ui/button/Button";
import styles from "@/components/form/form.module.scss";
import {MaterialSymbolsLibraryAddCheckSharp} from "@/components/ui/icons/icons";
import {useStore} from "@/context/StroeContext";

interface CategoryProps{
    handleSubmitForm :  SubmitHandler<FieldValues>
}
const CategoryForm = ({handleSubmitForm}:CategoryProps) => {
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm(
        {
            mode:"onChange",

        }
    )
    const {langJson}:{langJson: any} = useStore()
    return (
        <>
            <form className={styles.login_form} onSubmit={handleSubmit(handleSubmitForm)} >
                <Input type='text' placeholder={langJson.form.label.categoryLabel} {...register(('name'))}
                error={errors.name?.message}/>
                <Button disabled={isSubmitting} text={langJson.form.label.addLabel}>
                    <MaterialSymbolsLibraryAddCheckSharp/>
                </Button>
            </form>
        </>
    );
};

export default CategoryForm;
